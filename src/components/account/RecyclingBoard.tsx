import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {Trophy,Medal,Leaf} from 'lucide-react';
import {useI18n} from '@/lib/i18n';
import {getRecyclingBoard} from '@/lib/account/recycling.functions';
import {defaultWinners} from '@/lib/account/recycling';
import {Button} from '@/components/ui/button';
const fixtures=[{name:'Olive Grove Café',ar:'مقهى بستان الزيتون',kg:128.5,rank:1,pickups:0,materials:{}},{name:'Nablus Kitchen',ar:'مطبخ نابلس',kg:104,rank:2,pickups:0,materials:{}},{name:'Ramallah Market',ar:'سوق رام الله',kg:89.2,rank:3,pickups:0,materials:{}}];
export function RecyclingBoard(){
 const {t,lang}=useI18n(),s=t.account.recycling;const [demo,setDemo]=useState(false);
 const q=useQuery({queryKey:['recycling-board'],queryFn:()=>getRecyclingBoard(),refetchInterval:30000});
 const rows=demo?fixtures.map(x=>({...x,name:lang==='ar'?x.ar:x.name})):q.data?.rankings??[];
 const period=q.data?.period??new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Gaza',year:'numeric',month:'2-digit'}).format(new Date());
 return <section className="space-y-8"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-sm text-muted-foreground">{s.period} · {period.slice(0,7)}</p><h2 className="mt-2 text-3xl text-forest">{s.leaderboard}</h2></div><div className="flex gap-1"><Button variant={!demo?'secondary':'ghost'} onClick={()=>setDemo(false)}>{s.live}</Button><Button variant={demo?'secondary':'ghost'} onClick={()=>setDemo(true)}>{s.demoToggle}</Button></div></div>
 {demo&&<p className="border-s-4 border-primary bg-secondary p-4 text-sm font-semibold">{s.demo}</p>}
 {!demo&&q.isPending?<p role="status">{t.account.loading}</p>:!demo&&q.error?<p role="alert">{s.error}</p>:rows.length?<><div className="recycling-podium">{[2,1,3].map(rank=>{const row=rows.find(x=>x.rank===rank);return <article key={rank} className={`podium-place podium-${rank}`}><div className="podium-medal">{rank===1?<Trophy/>:<Medal/>}</div><h3 className="font-sans text-sm font-bold break-words">{row?.name??'—'}</h3><p className="mt-2 text-xl font-semibold">{row?.kg??0} <span className="text-xs">{s.kg}</span></p><div className="podium-step"><span className="text-4xl font-display">{rank}</span><span className="text-xs font-semibold">{(demo?defaultWinners:q.data?.rewardPercents??defaultWinners)[rank-1]}% · {s.rewards}</span></div></article>;})}</div><div className="divide-y divide-border">{rows.map(row=><div key={row.rank} className="flex items-center gap-4 py-4"><span className="w-8 text-lg text-muted-foreground">{row.rank}</span><Leaf className="h-4 w-4 text-primary"/><span className="min-w-0 flex-1 font-semibold">{row.name}</span><div className="text-end"><strong>{row.kg} {s.kg}</strong>{!demo&&<><p className="text-xs text-muted-foreground">{t.account.improvements.pickups}: {row.pickups}</p><p className="text-xs text-muted-foreground">{Object.entries(row.materials).map(([m,n])=>`${s[m as 'paper'|'cardboard'|'aluminum']}: ${n}`).join(' · ')}</p></>}</div></div>)}</div></>:<div className="border-y border-border py-14 text-center"><Trophy className="mx-auto mb-4 text-primary"/><p>{s.empty}</p></div>}
 <p className="text-sm text-muted-foreground">{s.ties}</p><p className="text-sm text-muted-foreground">{s.promotion}</p>
 <div className="border-t border-border pt-8"><h3 className="text-2xl text-forest">{s.history}</h3>{q.data?.history.length?q.data.history.map(h=><div key={h.period} className="py-5 border-b border-border"><strong>{h.period.slice(0,7)}</strong><div className="mt-3 flex flex-wrap gap-6">{h.winners.map(w=><span key={w.rank}>{w.rank}. {w.name} · {w.kg} {s.kg}</span>)}</div></div>):<p className="mt-4 text-muted-foreground">{s.noHistory}</p>}</div></section>;
}
