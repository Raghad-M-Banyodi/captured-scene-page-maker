import { useState, useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthShell } from '@/components/site/AuthShell';
import { useI18n } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';
import { readIdentity, useAccount } from '@/lib/account/session';
import { registrationSchema, loginSchema, dashboardPath } from '@/lib/account/rules';
export function AuthForm({mode,initialRole='buyer'}:{mode:'login'|'signup'|'forgot'|'reset';initialRole?:'buyer'|'supplier'|undefined}){
 const {t}=useI18n();const a=t.account;const navigate=useNavigate();const account=useAccount();
 const [role,setRole]=useState(initialRole);const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [message,setMessage]=useState('');const [recovery,setRecovery]=useState(false);
 useEffect(()=>{if(mode==='reset')setRecovery(window.location.hash.includes('type=recovery')||new URLSearchParams(window.location.search).get('type')==='recovery');},[mode]);
 useEffect(()=>{if(account.user&&(mode==='login'||mode==='signup'))void navigate({to:dashboardPath(account.roles),replace:true});},[account.user,account.roles,mode,navigate]);
 const titles={login:t.auth.loginTitle,signup:t.auth.signupTitle,forgot:a.reset,reset:a.reset};
 const field=(id:string,label:string,type='text',required=true,maxLength=150)=><div className="space-y-2"><Label htmlFor={id}>{label}</Label><Input id={id} name={id} type={type} required={required} maxLength={maxLength} minLength={type==='password'&&mode!=='login'?8:undefined} autoComplete={type==='password'?(mode==='login'?'current-password':'new-password'):type==='email'?'email':id==='full_name'?'name':undefined} className="h-11"/></div>;
 async function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();setError('');setBusy(true);const values=Object.fromEntries(new FormData(e.currentTarget));try{
 if(mode==='signup') {const parsed=registrationSchema.safeParse({...values,account_type:role,business_type:values['business_type']??'',description:values['description']??''});if(!parsed.success)throw new Error(a.invalid);const {email,password,...data}=parsed.data;const result=await supabase.auth.signUp({email,password,options:{data,emailRedirectTo:window.location.origin}});if(result.error)throw result.error;if(result.data.session){const identity=await readIdentity();await navigate({to:dashboardPath(identity.roles)});}else setMessage(a.confirm);}
 else if(mode==='login'){const parsed=loginSchema.safeParse(values);if(!parsed.success)throw new Error(a.invalid);const result=await supabase.auth.signInWithPassword(parsed.data);if(result.error)throw result.error;const identity=await readIdentity();await navigate({to:dashboardPath(identity.roles),replace:true});}
 else if(mode==='forgot'){const email=z.string().email().max(255).parse(values['email']);const result=await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${window.location.origin}/reset-password`});if(result.error)throw result.error;setMessage(a.resetSent);}
 else {if(!recovery)throw new Error(a.recoveryInvalid);const password=z.string().min(8).max(128).parse(values['password']);const result=await supabase.auth.updateUser({password});if(result.error)throw result.error;toast.success(a.passwordUpdated);await navigate({to:'/login'});}
 }catch(err){setError(err instanceof Error?err.message:a.error);}finally{setBusy(false);}}
 return <AuthShell title={titles[mode]} text={mode==='signup'?t.auth.signupText:mode==='login'?t.auth.loginText:''}>
 {message?<p role="status" className="rounded-lg bg-secondary p-5 text-secondary-foreground">{message}</p>:<form onSubmit={submit} className="space-y-4">
 {mode==='signup'&&<><div role="radiogroup" aria-label={t.auth.signupText} className="grid grid-cols-2 gap-3">{(['buyer','supplier'] as const).map(r=><Button key={r} type="button" role="radio" aria-checked={role===r} variant={r===role?'default':'outline'} onClick={()=>setRole(r)}>{r==='buyer'?t.auth.buyer:t.auth.supplierRole}</Button>)}</div>{field('full_name',t.auth.fullName)}{field('business_name',role==='supplier'?a.company:t.auth.business)}{role==='buyer'&&<div className="space-y-2"><Label htmlFor="business_type">{a.businessType}</Label><select id="business_type" name="business_type" required className="h-11 w-full rounded-md border border-input bg-background px-3">{Object.entries(a.businessTypes).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></div>}{field('phone',a.phone,'tel',true,30)}<div className="space-y-2"><Label htmlFor="city">{a.city}</Label><select id="city" name="city" className="h-11 w-full rounded-md border border-input bg-background px-3" required>{Object.entries(a.cities).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></div>{role==='supplier'&&field('description',a.description,'text',true,2000)}</>}
 {mode!=='reset'&&field('email',t.auth.email,'email',true,255)}{mode!=='forgot'&&field('password',mode==='reset'?a.newPassword:t.auth.password,'password',true,128)}
 {error&&<p role="alert" className="text-sm text-destructive">{error}</p>}
 <Button type="submit" size="lg" className="w-full" disabled={busy||(mode==='reset'&&!recovery)}>{busy?a.loading:mode==='signup'?t.auth.signupBtn:mode==='login'?t.auth.loginBtn:mode==='forgot'?a.sendReset:a.updatePassword}</Button>
 {mode==='reset'&&!recovery&&<p role="alert" className="text-muted-foreground">{a.recoveryInvalid}</p>}
 </form>}
 {mode==='login'&&<div className="mt-5 flex flex-wrap justify-between gap-3 text-sm"><Link to="/forgot-password" className="text-primary hover:underline">{a.forgot}</Link><Link to="/signup" className="text-primary hover:underline">{t.nav.signup}</Link></div>}{mode==='signup'&&<p className="mt-5 text-center text-sm"><Link to="/login" className="text-primary hover:underline">{t.auth.haveAccount} {t.nav.login}</Link></p>}
 </AuthShell>;
}
