var v=Object.defineProperty;var f=(c,a,p)=>a in c?v(c,a,{enumerable:!0,configurable:!0,writable:!0,value:p}):c[a]=p;var i=(c,a,p)=>(f(c,typeof a!="symbol"?a+"":a,p),p);import{s as x}from"./index.082e90b7.js";import{d as r}from"./linkedlist.3ad3eb3d.js";import{_ as d,e as w,f as _,g,o as m,c as b,b as y,F as L,h}from"./app.dd4a8a2f.js";const S=w({setup(c){_(()=>{const e=x(k.value).attr("viewBox",[0,0,400,200]);var o={id:"firstLinkedList",data:[1,2,4],x:60,y:24,cellHeight:24,cellWidth:24,cellFontSize:"8px"},t={id:"secondLinkedList",data:[1,3,4],x:60,y:72,cellHeight:24,cellWidth:24,cellFontSize:"8px"},n={id:"outputLinkedList",data:[],x:60,y:120,cellHeight:24,cellWidth:24,cellFontSize:"8px"},s=0,l=[{output:[]}];p(new a(1,new a(2,new a(4,null))),new a(1,new a(3,new a(4,null))),l),setInterval(()=>{n.data=l[s].output,r(e,o),r(e,t),r(e,n),s+=1,s>=l.length&&(s=0)},2e3)});class a{constructor(o,t){i(this,"val");i(this,"next");this.val=o===void 0?0:o,this.next=t===void 0?null:t}}function p(e,o,t){if(e==null){for(var n=o,s=[];n!=null;)s.push(n.val),n=n.next;return t.push({output:s}),o}if(o==null){for(var n=e,s=[];n!=null;)s.push(n.val),n=n.next;return t.push({output:s}),e}var l=e,u=o;if(l.val<u.val){l.next=p(l.next,u,t);for(var n=l,s=[];n!=null;)s.push(n.val),n=n.next;return t.push({output:s}),l}else{u.next=p(l,u.next,t);for(var n=u,s=[];n!=null;)s.push(n.val),n=n.next;return t.push({output:s}),u}}const k=g();return(e,o)=>(m(),b("svg",{ref_key:"d3svg",ref:k},null,512))}});var B=d(S,[["__file","P21.vue"]]);const N=h(`<h1 id="_21-merge-two-sorted-lists" tabindex="-1"><a class="header-anchor" href="#_21-merge-two-sorted-lists" aria-hidden="true">#</a> 21. Merge Two Sorted Lists</h1><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,3),O=h(`<h2 id="rust-solution" tabindex="-1"><a class="header-anchor" href="#rust-solution" aria-hidden="true">#</a> Rust Solution</h2><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">impl</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">pub</span> <span class="token keyword">fn</span> <span class="token function-definition function">merge_two_lists</span><span class="token punctuation">(</span>
        list1<span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token class-name">Box</span><span class="token operator">&lt;</span><span class="token class-name">ListNode</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
        list2<span class="token punctuation">:</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token class-name">Box</span><span class="token operator">&lt;</span><span class="token class-name">ListNode</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token class-name">Box</span><span class="token operator">&lt;</span><span class="token class-name">ListNode</span><span class="token operator">&gt;&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> list1<span class="token punctuation">.</span><span class="token function">is_none</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> list2<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> list2<span class="token punctuation">.</span><span class="token function">is_none</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> list1<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> p1 <span class="token operator">=</span> list1<span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> p2 <span class="token operator">=</span> list2<span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> p1<span class="token punctuation">.</span>val <span class="token operator">&lt;</span> p2<span class="token punctuation">.</span>val <span class="token punctuation">{</span>
            p1<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">Self</span><span class="token punctuation">::</span><span class="token function">merge_two_lists</span><span class="token punctuation">(</span>p1<span class="token punctuation">.</span>next<span class="token punctuation">,</span> <span class="token class-name">Some</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Some</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            p2<span class="token punctuation">.</span>next <span class="token operator">=</span> <span class="token keyword">Self</span><span class="token punctuation">::</span><span class="token function">merge_two_lists</span><span class="token punctuation">(</span><span class="token class-name">Some</span><span class="token punctuation">(</span>p1<span class="token punctuation">)</span><span class="token punctuation">,</span> p2<span class="token punctuation">.</span>next<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Some</span><span class="token punctuation">(</span>p2<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div>`,2),F={setup(c){return(a,p)=>(m(),b(L,null,[N,y(B),O],64))}};var C=d(F,[["__file","p21.html.vue"]]);export{C as default};