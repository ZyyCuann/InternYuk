import assert from 'node:assert/strict';
import {fresh,recommend,xp,award,completeModule,completeCase,readiness,streak,dayKey,recordActivity,applyJob,advanceApplication,profileCompletion} from '../dist/model.js';
import {paths,jobs,quizFor} from '../dist/data.js';
const s=fresh();assert.equal(xp(s),0);assert.equal(streak(s),0);assert.equal(profileCompletion(s),83);assert.equal(readiness(s),17);
const rec=recommend(s.user);assert.equal(rec[0].id,'banking');assert(rec.every(p=>p.score>=40&&p.score<=96));
assert.equal(completeModule(s,'banking',0,40),false);assert.equal(s.completed.length,0);
assert.equal(completeModule(s,'banking',0,80),true);assert.equal(xp(s),150);assert.equal(completeModule(s,'banking',0,100),false);assert.equal(xp(s),150);assert.equal(s.completed.length,1);
assert.equal(completeCase(s,'banking',[2,2,0]).score,67);assert.equal(xp(s),350);completeCase(s,'banking',[2,2,2]);assert.equal(xp(s),350);assert.equal(s.caseResults.banking.score,100);completeCase(s,'banking',[0,0,0]);assert.equal(s.caseResults.banking.score,100);
for(let i=1;i<8;i++)completeModule(s,'banking',i,100);s.cv={name:'cv-demo.pdf',demo:true};assert.equal(readiness(s),100);assert.equal(award(s,'profile',50),true);assert.equal(award(s,'profile',50),false);assert.equal(xp(s),1450);
s.path='marketing';assert.equal(readiness(s),20);s.path='banking';
const noCV=fresh();assert(applyJob(noCV,jobs[0],'',true).error);assert(applyJob(s,jobs[0],'',false).error);
const applied=applyJob(s,jobs[0],'Saya ingin mengembangkan kemampuan layanan.',true);assert(applied.application);assert.equal(s.applications.length,1);assert(applyJob(s,jobs[0],'',true).error);assert.equal(s.applications.length,1);
for(let i=0;i<3;i++)assert(advanceApplication(s,applied.application.id));assert.equal(advanceApplication(s,applied.application.id),false);assert.equal(s.applications[0].history.length,4);assert.equal(s.notifications.filter(n=>n.type==='lamaran').length,4);
const d=fresh(),today=new Date(2026,9,24,12);recordActivity(d,today);recordActivity(d,new Date(2026,9,23,12));assert.equal(streak(d,today),2);assert.equal(streak(d,new Date(2026,9,25,12)),2);assert.equal(streak(d,new Date(2026,9,26,12)),0);assert.equal(dayKey(today),'2026-10-24');
for(const p of paths)for(let i=0;i<8;i++){const questions=quizFor(p.id,i);assert.equal(questions.length,5);assert(questions.every(q=>q.correct>=0&&q.correct<q.options.length))}
console.log('PASS: recommendation rules, honest initial progress, unique XP, quiz pass/retry, best case score, path-specific readiness, CV/consent, duplicate applications, status timeline, notifications, streak, all question sets.');
