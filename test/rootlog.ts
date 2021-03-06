
import { parseRootlog } from '../src';

const testString = `
Map: Fall
Deck: E&P
Clearings: F1, R2, M3, R4, F5, M6, M7, R8, F9, M10, R11, F12
Pool: CDOPA
A: Guerric
P: Justin
O: Billy
C: Edu

C:t_k->2/b_s->2/b_r->10/b_w->5/w->1+2+3+5+6+7+8+9+10+11+12
A:3#->$
O:w->10+11/2w->5/$_->3
P:w->4+8+9 // Staking out the bottom left corner.

C:3w->O$/B#O->C/t->2/Zrpart/b_r->6/++/w->6+10/M#C->/t->2/B#C->/b_s->3/++/#->C
O:3#->O/w$->5/2w$->/t_r+w->5/++2/$_h->4
P:F#P->/w->1+6+12+8/w1->9/2w9->4/w4->/t->4/#->P
A:3w->O$/B#O->A/3B#$->/t->12+11+9/++2/Zmurine/Z%h/++2/2#A->$/#->A

C:t->2+4/t2+t4->/b_r->2/++2/w->10+2+6/w9->1/w7->3
O:XA11/At11->/M#O->A$/++/Z%f/++/#->A/XC5/Cw5->/XC5/Cb_w5->/++/Pw$->/w->11/2w11->12/#->A$/XA12/At12->/#->A$/++/$_->2
P:t4^t_r/++/B#P->/w->1+6+12+8/2w4->8/w12->/t->12/2w8->/t->8/#->P
A:(M+B)#$->/b_m+w->9/w->$/F#$->/t->12/++/M#$->/t->7/++/2#A->$/w->9/2#->A

C:t->2+3/t2+t3->/b_w->1+11/++2/w->10+6+1/(B+R)#C->/t->3/2#->C // Overpaid for the first Workshop (0 Wood).
O:2Cw$->/t_m+w->11/++2/Zleague/%f->e/XA12/At12->/#->A$/++/2w12->7/#->A$/XA7/At7->/#->A$/++/#->O/Zswap/#->O/$_h->3
P:Zfalse/#false$->/Ow11->12/t12^t_e/++2/#O->P/t8^t_s/++3/F#P->/w->1+6+8+12/w1->/t->1/3w6->3/2w3->/t->3/2#->P
A:(F+M+2R)#$->/t->12+11+3/++3/(M+B)#$->/t->7/++2/M#A->/w->$/#A->$/2w->9/2#->A

C:3w->O$/#O->C/t->2+3/Z%b/++/#->A/#^P/?Pt_s3/Pt3->/++/#^P/?Pt_e1/#C->P/#^P/?Pt_b1/Pt1->/++/t2+t3->/b_s->11/++2/w->10+1+6/B#C->/3w6->11/^A/#->A$/w12->10/XA3/At3->/#->A$/++/2#->C
O:#A->O/#O->A/#->O/2Cw$->/t_r+w->6/++2/Zprop/w$->11/XA7/At7->/#->A$/++/#->O/F#O->/Cw6->/w->6
P:Z%s/++2/R#P->/w->5+3+4+10/t4<->t12/w1->5/w5->/t->5/2#->P/#P->
A:(2R+F+B)#$->/t->6+3/++3/Zengrave/Z%f/++2/#A->$/w9->4/w4->/t->4/++2/2#->A

C:t->2+3+11/5w10->1/5w1->9/^A/#->A$/t3+t11+t2->/b_r->9/++3/w->2+6+9+10/2#->C
O:XA6/At6->/#->A$/++/XA11/At11->/#->A$/++/XA12/At12->/#->A$/++/4w5->10/XC10/(2w+2Cw)10->/R#C->/2Cw->2/XC10/Cb_r10->/++/#->O/R#O->/Pw5->/w->5/XP5/Pt5^t_r/Pw->1/(w+Pt_r)5->/++/#->O
P:Zfalse/#false$->/2Aw9->4/w3->/t->3/4w8->7/2w7->/t->7/t12<->t4 // Exerted.
A:4F#$->/t->12+6/++3/Z%t/++3/B#A->/w->$/2w4->8/XP8Ba/2w8->/w->9/2#->A

C:t->2+3+11/Z%t/++2/#->A/4w2->5/w5->1/^A/#->A$/t2+t3+t11->/b_s->5/++3/XA3/At3->/R#C->A$/++/2#->C
O:#A->O/#O->A/#->O/2w10->12/2w$->/t_f+w->12/++2/M#O->/Pw7->/w->7/XA12/At12->/#->A$/++/XA6/At6->/#->A$/++/Z%s/++2/#->A/2w$->/t_r+w->7/++2/%s->e/XP7Ma/(4w+Pw+Pt)7->/++
P:t3^t_r/++4/R#P->/w->5+3+4+10/XA4/At4->/R#P->A$/++/w12->4/w1->10/w10->/t->10
A:2R#$->/t->4/++/Z%b/++2/2#A->$/B#A->/w->$/w->9/XC9/2Cw9->/XC9/Cb_r9->/++/2#->A

C:t->5+2+3+11/Z%x/++/#->A/t5+t11+t3->/b_s->5/++4/XP8/Pt8->/++/3w1->10/2t2->/b_r->10/++2/B#C->/XO5/Ot5->/++ // I count 5 actions, and only 1 Bird spent: Build, Battle, Move, Build, Battle. Did I miss a Bird spend?

Winner: C // Frequent disconnects didn't stop the winner. :)
`;

const test2String = `
Map: Lake
Deck: E&P
Clearings: F1, R2, M3, R4, F5, M6, M7, R8, F9, M10, R11, F12
Pool: CEVAG
E: LilyG
V: Andromeda
C: Phily
G: Phouglas

C:t_k->2/b_w->2/b_s+b_r->10/w->2+3+4+5+6+7+8+9+10+11+12
E:b+6w->1/#despot->$
G:#adventurer->$/p->2_7_10
V:#thief->$/p->4_5_6_11

G:p->10/%r->e/%s10->$/++/Z%t/++2/%t->t/%s->e+d/%f->e/M#Q->$/2#->G/#->G
C:t->10/w5->11/w8->10/t10->/b_r->11/XG10/%rG$->d/#->C
V:p->11/%r->e/%f11->$/++/%t->s+e/%f->e/R#Q->$/2#->V/++/%f->e/#V->C/$_C->1/++/#->V
E:(B+F)#E->$_r/2w->1/(5w+r)1->12/#->E/b->12/++/#->E

G:%f+%h+%s+%r->r/%h->e/%r->e/%b10->$/%b->t/%b->s+e/#G->C/$_C->1/++/%f->e/p->8/#->G
C:t->10/Ztun/B#C->/M#C->/t->10/b_s->11/++/b_w->10/++2/w->10+11/#->C
V:%t+%f+%r->r/%t->t/%s+%r->e/R#Q->$/++2/%f->e/p->5/#->V
E:B#E->$_m/F#E->$_b/2w->12/3w12->3/2w12->9/b->3+9/++3/2#->E

G:%b+%f+%r+%h->r/p->3/%r->e/%b->e+d/M#Q->$/++2/%h->e/Z%t/++2/%t->t/%f->e/p->12/#->G
C:t->11+12/w4->6/w10->2/t11+t12->/b_s->6/++2/w->11+12/#->C
V:%s+%r+%f->r/%r->e/%h5->$/++/%f->e/p->1/%s->e/#V->E/$_E->1/++/%f+%t->s+e/F#Q->$/++/#->V
E:F#E->$_r/B#E->$_x/Z%h/++/w->1+3+12/2w3->8/2w1->5/XG12/(%t+%f+%s)G$->d/b->5+8/++4/3#->E

G:%f+%h+%r+%b->r/%h->e/F#G->E/%hE$->$/$_E->1/++/%h->e/%r->e/%h12->$/++/%h->e/%bd->t/#->G
C:t->10+11+6/Z%b/++/M#C->/t->10/2t10->/b_w->6/++2/t11+t6->/b_r->7/++2/2#->C
V:%t+%b+%r->r/%t->t/p->9/%h->e/Z%x/++/%f->e/p->3/%r+%x->e/M#Q->$/++/M#domV->$/++->E$/#->V
E:2F#E->$_r/w->8/4w->5/3w5->4/XG3/%_->d/b->4/$_->/--5/#commander->$/++5/3#->E

G:p->1_9_12/$_d->s+r/#->G
C:t->6+11+12/Zprop/B#C->/(w+r)12->11/#->C/4w11->5/F#C->/Ew5->/w->5/XE5/(w+Ew)5->/XE5/(Ew+Eb+w)5->/++/w->7+11+12/2#->C
V:2%f+%s+%h+%x->r/p->8/%f+%s->e/2R#V->E/$_E->2/%f->e/p->10/Z%b/++/%b->t/%x->e/Cw10->/$_C->h/M#C->/w->2/#->V
E:(R+B)#E->$_r/Zswap/2w->8/3w8->10/XC10/2Cw10->/++4/2#->E/#E-> // They draw 2 but should draw 3, I think.

G:p->9/%f->e/p->3/%h+%r->e/F#Q->$/2%h->e/2#G->C/$_C->2/++2/B#G->/B#dom->G/B#domG->$/++->C$/XE9F@/%r+%h->d/Ew9->/%f->d/#->G
C:t->6+10+11/2B#C->/R#C->/Ew4->/w->4/3w5->4/3w2->8/XE4/(2Ew+Eb+2w)4->/++/R#C->/2w->2/XC8B@/(3w+Ew)8->/2w7->2/3w2->8/XE8/(Ew+Eb)8->/++/2#->C
V:2%f+%s+%h+%x->r/p->7/%s->e/XC7/b_r7->/%h->e/Zsabo/2%f->e/p->11/%x->e/Cw11->/R#C->/Cw->2/#->V
E:#C->E/#E->C/M#E->$_r/w->3+9/$_->/--3/++3/#charismatic->$/2#->E

G:%f+3%h+%r->r/%h->e/%fd->s/%f->e/p->8/%h+%s+%tt->s+e/3#G->C/$_C->a/#->G
C:t->6+10+11/Z%f/++/B#C->/3t11->/b_w->2/++3/2w6->2/4w2->5/2t10->/b_r->5/++2/3t6->/b_s->5/++3/2#->C // Used tunnels to spend the wood for the recruiter.
V:2%f+%s+%x+%r->r/p->5/%r->e/%s5->$/%x->e/Cw5->/%s->e/XC5/2Cw5->/F#C->/2Cw->2/%s->e/(Cw+Cb_s)5->/%f->d/#->V // Forgot to use Saboteurs.
E:#V->E/#E->V/B#E->$_m/F#E->$_x/w->1/3w1->5/XE10B@M@/(w+Cw+Cb_w)10->/++/XE5/Cb_r5->/++/++3/2#->E

G:%_->r/%ts->t/%h->e/%rd->s/%r+%tt->s+e/R#Q->$/2#->G/%h->e/#V->C/%fC$->$/2%f->e/p->10/%s->e/XE10/Ew10->/%s->d/#->G
C:t->10+11/Z%c/++3/F#domC->/Ew1->/w->1/XE1/++/t10+t11->/b_s->10/++3

Winner: CG
`;

const afterDarkSpecial = `
// Played: 5 Dec 2020
// https://www.youtube.com/watch?v=i5aWuH5CeGg

Map: Fall
Deck: E&P
Clearings: R1, F2, R3, F4, R5, M6, M7, F8, M9, M10, R11, F12
Pool: CDOAP
O: Drew
D: GuerricS
P: LilyG
A: Nevakanezah

A:3#->$
O:4w->12/3w->$/$_->2
D:2w+t->4/2w->9+10+11
P:w->2+3+6

A:(F+R)#$->/t->4+11/++/2#A->$/#->A
P:B#P->/w->2+4+8+12/w2->/t->4/w12->8/2w->8/t->8/w3->8
D:w->0/2w->O$/#gentlyusedknapsackO$->D/R#D->/(t+w0)->5/R#^/b_m->5/2M#^/#marshal->$/++/2#->D
O:2w$->/b_f+w->12/++2/Z%x/++/#->O/$_h->3

A:3w->O$/#cplansO$->A/(B+R)#$->/2Dw->/b_r+w->11/w->$/M#$->/t->10/++/w->11/Zsoup/2#->A  // Soup kitchens crafted out of order, but was an easy rollback
P:3w->O$/M#@O$->P/Z%s/++2/t2^t_e/++/t8^t_r/++2/F#P->/w->2+4+8+12/w2->6/2w6->5/XD5/(Dw+Dt)5->/++/XD5/Db_m5->/#marshalD$->/++  // Duchy forgot to discard for Price of Failure
D:w->0/2w->0/(B+2M)#^/#brigadier->$/++2/B#->/#->D
O:2Aw$->/b_r+w->11/++2/Aw$->/w->11/3Pw$->/3w->11/3#->O

A:3w->O$/#saboO$->A/Zsabo/w->11/2#->A
P:3w->O$/#leagueO$->A/M#P->/w->6+7+9+10/w6->/t->6/2w5->6/w7->3/#->P
D:w->0/R#D->/(t+4w0)->5/R#^/b_c->5/XA10/At10->/M#D->A$/++/XA4/At4->/D^A/#->A$/++/2M#^/#captain->$/++/#->C
O:2Pw$->/b_m+w->12/Dw$->/#->O/Z%f/++/Aw$->/w->11/3w11->1

A:(M+F+B)#$->/t->4+8+9/++2/Zcharm/#->A/P++/2#->A  // Should have spent one more and scored one more? Had a token on 11
P:t6^t_e/++3/#O->P/R#P->/w->1+3+5/w1->5/w3->/t->3/XA8/At8->/F#P->A$/++/XA3B@R@/At3->/P^A/#->A$/++
D:2w->0/R#^/b_c->5/2w0->5/w9->4/w5->6/XP5/Pw->/3M#^/#mayor->$/++2/Zcoffin/#->D
O:XA11/Aw11->/2Ow11->/3#->O/$_h->4  // Otters had no warriors left for protectionism – they have to suicide against the Alliance!

A:(M+B)#$->/(Dw+Pw)9->/(b_m+2w)->9/w->$/2B#A->/2w->$/2#A->$/#->A/P++/w9->4/w4->/t->4/++/w->9+11/3#->A  // Unsure why they put two warriors on their base when revolting – think that was an error
P:t^3->t_s/++4/M#P->/w->6+7+9+10/XA4F@/2w->/2w8->12/w12->/t->12/3#->P
D:++/4w->0/B#D->/(t+4w0)->2/XP2/(Pw+Pt_e)->/++/XA4/At4->/D^A/#->A$/++/4w2->7/3w4->0/XP5/Pw5->/XP7/(Pw+w)7->/2M#^/#marshal->$/#->D
O:2w->$/XP12/Pt12^t_r/Pw->2+3+8/(Pw+2w+Pt_r)12->/++/3w12->2/b_f->2/++2/Z%s/++2/$_h->2

A:3F#$->/t->8+12/++2/Ztun/#A->$/#->A/P++/2w9->8/2w8->12/2w->9/3#->A
P:Zprop/F#P->/Ow2->/w->2/XD2/Dt2->/++/2w2->12/XO12/Ob_f12->/++/2#->P
D:++2/4w->0/5w5->1/XO1/Ow1->/XO1/(2Ow+2w)1->/7w0->5/2w1->5/3w5->6/XO6/(w+Ow+Ob_f)6->/++/XP6M@/(3w+Pw)6->/(2M+F)#^/#banker->$/++2/#->D
O:2w->$/5#->O/2#O->/$_->3

A:(B+F)#$->/(2Ow+2Pw)12->/b_f->12/4#A->$/#->A/P++/4#->A/#A->
P:R#->/w->1+3+5+11/w11->1/w2->1/w1->/t->1/2#->P
D:++3/4w->0/2w->0/6w0->5/6w5->6/XP6/(w+2Pw+Pt_e)6->/++/4w6->5/M#D->/++/(F+3M)#^/#earlofstone->$/++3/#->D
O:2w->$/3#->O/3w11->10/2Ow$->/b_m->10/++2/Zleague/Z%b/#O->

A:(2R+F+B)#$->/t->1+2/++4/2w9->4/4#A->$/w4->10/w4->/t->4/++2/w10->/t->10/++3/#->A/P++/4#->A/2#A->
P:Z%c/++3/Z%h/++2/t1^t_s/++3

Winner: P
`;

const result = parseRootlog(afterDarkSpecial);

const util = require('util');
const fs = require('fs');
fs.writeFile("rootlog-test.json", JSON.stringify(result), (er, r) => {

});
// console.log(util.inspect(result, {showHidden: false, depth: null}));
