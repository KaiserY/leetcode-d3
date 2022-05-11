import{s as L}from"./index.082e90b7.js";import{d as z}from"./matrix.a41e1099.js";import{_ as C,e as V,f as j,g as H,o as N,c as P,b as R,F as W,h as F}from"./app.dd4a8a2f.js";const M=Math.PI,E=2*M,y=1e-6,O=E-y;function T(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function I(){return new T}T.prototype=I.prototype={constructor:T,moveTo:function(s,n){this._+="M"+(this._x0=this._x1=+s)+","+(this._y0=this._y1=+n)},closePath:function(){this._x1!==null&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(s,n){this._+="L"+(this._x1=+s)+","+(this._y1=+n)},quadraticCurveTo:function(s,n,a,t){this._+="Q"+ +s+","+ +n+","+(this._x1=+a)+","+(this._y1=+t)},bezierCurveTo:function(s,n,a,t,o,c){this._+="C"+ +s+","+ +n+","+ +a+","+ +t+","+(this._x1=+o)+","+(this._y1=+c)},arcTo:function(s,n,a,t,o){s=+s,n=+n,a=+a,t=+t,o=+o;var c=this._x1,i=this._y1,u=a-s,l=t-n,e=c-s,d=i-n,h=e*e+d*d;if(o<0)throw new Error("negative radius: "+o);if(this._x1===null)this._+="M"+(this._x1=s)+","+(this._y1=n);else if(h>y)if(!(Math.abs(d*u-l*e)>y)||!o)this._+="L"+(this._x1=s)+","+(this._y1=n);else{var p=a-c,r=t-i,k=u*u+l*l,m=p*p+r*r,b=Math.sqrt(k),_=Math.sqrt(h),f=o*Math.tan((M-Math.acos((k+h-m)/(2*b*_)))/2),x=f/_,g=f/b;Math.abs(x-1)>y&&(this._+="L"+(s+x*e)+","+(n+x*d)),this._+="A"+o+","+o+",0,0,"+ +(d*p>e*r)+","+(this._x1=s+g*u)+","+(this._y1=n+g*l)}},arc:function(s,n,a,t,o,c){s=+s,n=+n,a=+a,c=!!c;var i=a*Math.cos(t),u=a*Math.sin(t),l=s+i,e=n+u,d=1^c,h=c?t-o:o-t;if(a<0)throw new Error("negative radius: "+a);this._x1===null?this._+="M"+l+","+e:(Math.abs(this._x1-l)>y||Math.abs(this._y1-e)>y)&&(this._+="L"+l+","+e),a&&(h<0&&(h=h%E+E),h>O?this._+="A"+a+","+a+",0,1,"+d+","+(s-i)+","+(n-u)+"A"+a+","+a+",0,1,"+d+","+(this._x1=l)+","+(this._y1=e):h>y&&(this._+="A"+a+","+a+",0,"+ +(h>=M)+","+d+","+(this._x1=s+a*Math.cos(o))+","+(this._y1=n+a*Math.sin(o))))},rect:function(s,n,a,t){this._+="M"+(this._x0=this._x1=+s)+","+(this._y0=this._y1=+n)+"h"+ +a+"v"+ +t+"h"+-a+"Z"},toString:function(){return this._}};function Z(s){var n=0,a=s.children,t=a&&a.length;if(!t)n=1;else for(;--t>=0;)n+=a[t].value;s.value=n}function Q(){return this.eachAfter(Z)}function Y(s,n){let a=-1;for(const t of this)s.call(n,t,++a,this);return this}function G(s,n){for(var a=this,t=[a],o,c,i=-1;a=t.pop();)if(s.call(n,a,++i,this),o=a.children)for(c=o.length-1;c>=0;--c)t.push(o[c]);return this}function J(s,n){for(var a=this,t=[a],o=[],c,i,u,l=-1;a=t.pop();)if(o.push(a),c=a.children)for(i=0,u=c.length;i<u;++i)t.push(c[i]);for(;a=o.pop();)s.call(n,a,++l,this);return this}function K(s,n){let a=-1;for(const t of this)if(s.call(n,t,++a,this))return t}function U(s){return this.eachAfter(function(n){for(var a=+s(n.data)||0,t=n.children,o=t&&t.length;--o>=0;)a+=t[o].value;n.value=a})}function X(s){return this.eachBefore(function(n){n.children&&n.children.sort(s)})}function $(s){for(var n=this,a=nn(n,s),t=[n];n!==a;)n=n.parent,t.push(n);for(var o=t.length;s!==a;)t.splice(o,0,s),s=s.parent;return t}function nn(s,n){if(s===n)return s;var a=s.ancestors(),t=n.ancestors(),o=null;for(s=a.pop(),n=t.pop();s===n;)o=s,s=a.pop(),n=t.pop();return o}function sn(){for(var s=this,n=[s];s=s.parent;)n.push(s);return n}function an(){return Array.from(this)}function tn(){var s=[];return this.eachBefore(function(n){n.children||s.push(n)}),s}function en(){var s=this,n=[];return s.each(function(a){a!==s&&n.push({source:a.parent,target:a})}),n}function*on(){var s=this,n,a=[s],t,o,c;do for(n=a.reverse(),a=[];s=n.pop();)if(yield s,t=s.children)for(o=0,c=t.length;o<c;++o)a.push(t[o]);while(a.length)}function B(s,n){s instanceof Map?(s=[void 0,s],n===void 0&&(n=ln)):n===void 0&&(n=cn);for(var a=new w(s),t,o=[a],c,i,u,l;t=o.pop();)if((i=n(t.data))&&(l=(i=Array.from(i)).length))for(t.children=i,u=l-1;u>=0;--u)o.push(c=i[u]=new w(i[u])),c.parent=t,c.depth=t.depth+1;return a.eachBefore(un)}function pn(){return B(this).eachBefore(rn)}function cn(s){return s.children}function ln(s){return Array.isArray(s)?s[1]:null}function rn(s){s.data.value!==void 0&&(s.value=s.data.value),s.data=s.data.data}function un(s){var n=0;do s.height=n;while((s=s.parent)&&s.height<++n)}function w(s){this.data=s,this.depth=this.height=0,this.parent=null}w.prototype=B.prototype={constructor:w,count:Q,each:Y,eachAfter:J,eachBefore:G,find:K,sum:U,sort:X,path:$,ancestors:sn,descendants:an,leaves:tn,links:en,copy:pn,[Symbol.iterator]:on};function hn(s,n){return s.parent===n.parent?1:2}function v(s){var n=s.children;return n?n[0]:s.t}function S(s){var n=s.children;return n?n[n.length-1]:s.t}function dn(s,n,a){var t=a/(n.i-s.i);n.c-=t,n.s+=a,s.c+=t,n.z+=a,n.m+=a}function kn(s){for(var n=0,a=0,t=s.children,o=t.length,c;--o>=0;)c=t[o],c.z+=n,c.m+=n,n+=c.s+(a+=c.c)}function fn(s,n,a){return s.a.parent===n.parent?s.a:a}function q(s,n){this._=s,this.parent=null,this.children=null,this.A=null,this.a=this,this.z=0,this.m=0,this.c=0,this.s=0,this.t=null,this.i=n}q.prototype=Object.create(w.prototype);function mn(s){for(var n=new q(s,0),a,t=[n],o,c,i,u;a=t.pop();)if(c=a._.children)for(a.children=new Array(u=c.length),i=u-1;i>=0;--i)t.push(o=a.children[i]=new q(c[i],i)),o.parent=a;return(n.parent=new q(null,0)).children=[n],n}function bn(){var s=hn,n=1,a=1,t=null;function o(e){var d=mn(e);if(d.eachAfter(c),d.parent.m=-d.z,d.eachBefore(i),t)e.eachBefore(l);else{var h=e,p=e,r=e;e.eachBefore(function(f){f.x<h.x&&(h=f),f.x>p.x&&(p=f),f.depth>r.depth&&(r=f)});var k=h===p?1:s(h,p)/2,m=k-h.x,b=n/(p.x+k+m),_=a/(r.depth||1);e.eachBefore(function(f){f.x=(f.x+m)*b,f.y=f.depth*_})}return e}function c(e){var d=e.children,h=e.parent.children,p=e.i?h[e.i-1]:null;if(d){kn(e);var r=(d[0].z+d[d.length-1].z)/2;p?(e.z=p.z+s(e._,p._),e.m=e.z-r):e.z=r}else p&&(e.z=p.z+s(e._,p._));e.parent.A=u(e,p,e.parent.A||h[0])}function i(e){e._.x=e.z+e.parent.m,e.m+=e.parent.m}function u(e,d,h){if(d){for(var p=e,r=e,k=d,m=p.parent.children[0],b=p.m,_=r.m,f=k.m,x=m.m,g;k=S(k),p=v(p),k&&p;)m=v(m),r=S(r),r.a=e,g=k.z+f-p.z-b+s(k._,p._),g>0&&(dn(fn(k,e,h),e,g),b+=g,_+=g),f+=k.m,b+=p.m,x+=m.m,_+=r.m;k&&!S(r)&&(r.t=k,r.m+=f-_),p&&!v(m)&&(m.t=p,m.m+=b-x,h=e)}return h}function l(e){e.x*=n,e.y=e.depth*a}return o.separation=function(e){return arguments.length?(s=e,o):s},o.size=function(e){return arguments.length?(t=!1,n=+e[0],a=+e[1],o):t?null:[n,a]},o.nodeSize=function(e){return arguments.length?(t=!0,n=+e[0],a=+e[1],o):t?[n,a]:null},o}function D(s){return function(){return s}}var _n=Array.prototype.slice;function gn(s){return s[0]}function yn(s){return s[1]}class xn{constructor(n,a){this._context=n,this._x=a}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(n,a){switch(n=+n,a=+a,this._point){case 0:{this._point=1,this._line?this._context.lineTo(n,a):this._context.moveTo(n,a);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+n)/2,this._y0,this._x0,a,n,a):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+a)/2,n,this._y0,n,a);break}}this._x0=n,this._y0=a}}function wn(s){return new xn(s,!1)}function qn(s){return s.source}function zn(s){return s.target}function vn(s){let n=qn,a=zn,t=gn,o=yn,c=null,i=null;function u(){let l;const e=_n.call(arguments),d=n.apply(this,e),h=a.apply(this,e);if(c==null&&(i=s(l=I())),i.lineStart(),e[0]=d,i.point(+t.apply(this,e),+o.apply(this,e)),e[0]=h,i.point(+t.apply(this,e),+o.apply(this,e)),i.lineEnd(),l)return i=null,l+""||null}return u.source=function(l){return arguments.length?(n=l,u):n},u.target=function(l){return arguments.length?(a=l,u):a},u.x=function(l){return arguments.length?(t=typeof l=="function"?l:D(+l),u):t},u.y=function(l){return arguments.length?(o=typeof l=="function"?l:D(+l),u):o},u.context=function(l){return arguments.length?(l==null?c=i=null:i=s(c=l),u):c},u}function Sn(){return vn(wn)}function A(s,n){var a=s.select("#"+n.id);a.empty()&&(a=s.append("g").attr("id",n.id)),a.attr("transform","translate("+n.x+", "+n.y+")");var t=bn().size([n.width,n.height]),o=B(n.data,p=>p.data),c=t(o),i=c.descendants(),u=c.descendants().slice(1);i.forEach(p=>p.data.selected=!1);var l=i.find(p=>n.selectedID==p.data.id);l==null||l.ancestors().forEach(p=>p.data.selected=!0);var e=i.find(p=>{var r;return((r=n.selectedEdge)==null?void 0:r[0])==p.data.id}),d=i.find(p=>{var r;return((r=n.selectedEdge)==null?void 0:r[0])==p.data.id});d!=null&&e!=null&&e.path(d).forEach(p=>p.data.selected=!0),a.selectAll("g.node").data(i).join(p=>{var r=p.append("g").attr("class","node").attr("transform",k=>"translate("+k.x+","+k.y+")");return r.append("circle").attr("class","node").attr("r",n.cellFontSize).style("fill","lightsteelblue").attr("stroke",k=>k.data.selected?"red":"black").attr("stroke-width",1),r.append("text").attr("font-size",n.cellFontSize).attr("fill","black").style("text-anchor","middle").style("alignment-baseline","central").text(k=>k.data.name),r},p=>(p.selectAll("circle").attr("r",n.cellFontSize).style("fill","lightsteelblue").attr("stroke-width",1).transition().duration(500).attr("stroke",r=>r.data.selected?"red":"black"),p),p=>p);var h=Sn().x(p=>p[0]).y(p=>p[1]);a.selectAll("path.link").data(u).join(p=>p.insert("path","g").attr("class","link").attr("d",r=>h({source:[r.parent.x,r.parent.y],target:[r.x,r.y]})).style("fill","none").style("stroke",r=>r.data.selected?"red":"black").style("stroke-width",1),p=>p.attr("d",r=>h({source:[r.parent.x,r.parent.y],target:[r.x,r.y]})).style("fill","none").style("stroke-width",1).transition().duration(500).style("stroke",r=>r.data.selected?"red":"black"),p=>p)}const An=V({setup(s){j(()=>{const a=L(n.value).attr("viewBox",[0,0,400,200]);var t={id:"inputD3Tree",x:24,y:24,height:100,width:360,cellFontSize:"8px",selectedID:"root",data:{id:"root",name:"23",selected:!1,data:[{id:"a",name:"a",data:[{id:"ad",name:"d",data:[],selected:!1},{id:"ae",name:"e",data:[],selected:!1},{id:"af",name:"f",data:[],selected:!1}],selected:!1},{id:"b",name:"b",data:[{id:"bd",name:"d",data:[],selected:!1},{id:"be",name:"e",data:[],selected:!1},{id:"bf",name:"f",data:[],selected:!1}],selected:!1},{id:"c",name:"c",data:[{id:"cd",name:"d",data:[],selected:!1},{id:"ce",name:"e",data:[],selected:!1},{id:"cf",name:"f",data:[],selected:!1}],selected:!1}]}},o={id:"outputMatrix",data:[["","","","","","","","",""]],x:96,y:168,cellHeight:24,cellWidth:24,cellFontSize:"8px"};A(a,t),z(a,o);var c=!1,i=["ad","ae","af","bd","be","bf","cd","ce","cf"],u=["","","","","","","","",""],l=0;setInterval(()=>{if(c){c=!1,u=["","","","","","","","",""],l=0,t.selectedID="root",o.data=[u],A(a,t),z(a,o);return}u[l]=i[l],t.selectedID=i[l],o.data=[u],A(a,t),z(a,o),l+=1,l>=i.length&&(c=!0)},2e3)});const n=H();return(a,t)=>(N(),P("svg",{ref_key:"d3svg",ref:n},null,512))}});var Mn=C(An,[["__file","P17.vue"]]);const En=F(`<h1 id="_17-letter-combinations-of-a-phone-number" tabindex="-1"><a class="header-anchor" href="#_17-letter-combinations-of-a-phone-number" aria-hidden="true">#</a> 17. Letter Combinations of a Phone Number</h1><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Input: digits = &quot;23&quot;
Output: [&quot;ad&quot;,&quot;ae&quot;,&quot;af&quot;,&quot;bd&quot;,&quot;be&quot;,&quot;bf&quot;,&quot;cd&quot;,&quot;ce&quot;,&quot;cf&quot;]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,3),Tn=F(`<h2 id="rust-solution" tabindex="-1"><a class="header-anchor" href="#rust-solution" aria-hidden="true">#</a> Rust Solution</h2><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">impl</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token constant">ALPHA</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token operator">&amp;</span><span class="token lifetime-annotation symbol">&#39;static</span> <span class="token keyword">str</span><span class="token punctuation">;</span> <span class="token number">10</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>
        <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>     <span class="token comment">// 0</span>
        <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>     <span class="token comment">// 1</span>
        <span class="token string">&quot;abc&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 2</span>
        <span class="token string">&quot;def&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 3</span>
        <span class="token string">&quot;ghi&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 4</span>
        <span class="token string">&quot;jkl&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 5</span>
        <span class="token string">&quot;mno&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 6</span>
        <span class="token string">&quot;pqrs&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 7</span>
        <span class="token string">&quot;tuv&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 8</span>
        <span class="token string">&quot;wxyz&quot;</span><span class="token punctuation">,</span> <span class="token comment">// 9</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">pub</span> <span class="token keyword">fn</span> <span class="token function-definition function">letter_combinations</span><span class="token punctuation">(</span>digits<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> ret <span class="token operator">=</span> <span class="token class-name">Vec</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> digits<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">Self</span><span class="token punctuation">::</span><span class="token function">dfs</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>digits<span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token class-name">String</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
        ret
    <span class="token punctuation">}</span>

    <span class="token keyword">fn</span> <span class="token function-definition function">dfs</span><span class="token punctuation">(</span>digits<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token keyword">str</span><span class="token punctuation">,</span> comb<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token class-name">String</span><span class="token punctuation">,</span> ret<span class="token punctuation">:</span> <span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token class-name">String</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> digits<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
            ret<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>comb<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token keyword">let</span> <span class="token class-name">Some</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token operator">=</span> digits<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">nth</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">for</span> cc <span class="token keyword">in</span> <span class="token keyword">Self</span><span class="token punctuation">::</span><span class="token constant">ALPHA</span><span class="token punctuation">[</span>c <span class="token keyword">as</span> <span class="token keyword">usize</span> <span class="token operator">-</span> <span class="token char">&#39;0&#39;</span> <span class="token keyword">as</span> <span class="token keyword">usize</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                comb<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cc<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">Self</span><span class="token punctuation">::</span><span class="token function">dfs</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>digits<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token punctuation">]</span><span class="token punctuation">,</span> comb<span class="token punctuation">,</span> ret<span class="token punctuation">)</span><span class="token punctuation">;</span>
                comb<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div>`,2),Bn={setup(s){return(n,a)=>(N(),P(W,null,[En,R(Mn),Tn],64))}};var Pn=C(Bn,[["__file","p17.html.vue"]]);export{Pn as default};
