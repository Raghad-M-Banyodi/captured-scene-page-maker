import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { AppRole } from './rules';
const Context = createContext<{user: User | null; roles: AppRole[]; loading: boolean}>({user:null, roles:[], loading:true});
export async function readIdentity() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return {user:null, roles:[] as AppRole[]};
  const response = await supabase.from('user_roles').select('role').eq('user_id',data.user.id);
  if (response.error) throw response.error;
  return {user:data.user, roles:(response.data ?? []).map(r=>r.role)};
}
export function AccountProvider({children}:{children:ReactNode}) {
  const router=useRouter(); const queryClient=useQueryClient();
  const [state,setState]=useState<{user:User|null;roles:AppRole[];loading:boolean}>({user:null,roles:[],loading:true});
  useEffect(()=>{
    let active=true;
    const refresh=()=>readIdentity().then(s=>{if(active)setState({...s,loading:false});}).catch(()=>{if(active)setState({user:null,roles:[],loading:false});});
    void refresh();
    const {data:{subscription}}=supabase.auth.onAuthStateChange(event=>{
      if(!['SIGNED_IN','SIGNED_OUT','USER_UPDATED','PASSWORD_RECOVERY'].includes(event))return;
      if(event==='SIGNED_OUT') {setState({user:null,roles:[],loading:false});void router.invalidate();return;}
      setTimeout(()=>{void refresh().then(()=>{void router.invalidate();void queryClient.invalidateQueries();});},0);
    });
    return ()=>{active=false;subscription.unsubscribe();};
  },[router,queryClient]);
  return <Context.Provider value={state}>{children}</Context.Provider>;
}
export const useAccount=()=>useContext(Context);
