import{s as d}from"./index.082e90b7.js";import{d as e}from"./matrix.a41e1099.js";import{_ as o,e as k,f as b,g as m,o as l,c,b as x,F as h,h as i}from"./app.dd4a8a2f.js";const f=k({setup(u){b(()=>{const a=d(p.value).attr("viewBox",[0,0,400,200]);var r={id:"inputMatrix",data:[["1","2","3","2","1"]],x:60,y:24,cellHeight:24,cellWidth:24,cellFontSize:"8px"},n={id:"xMatrix",data:[["1","2","3","2","1"]],x:60,y:72,cellHeight:24,cellWidth:24,cellFontSize:"8px"},s={id:"yMatrix",data:[["","","","",""]],x:60,y:120,cellHeight:24,cellWidth:24,cellFontSize:"8px"};e(a,r),e(a,n),e(a,s);var t=0;setInterval(()=>{switch(t){case 0:n.data=[["1","2","3","2","1"]],s.data=[["","","","",""]];break;case 1:n.data=[["1","2","3","2","1"]],s.data=[["","","","",""]];break;case 2:n.data=[["","1","2","3","2"]],s.data=[["","","","","1"]];break;case 3:n.data=[["","","1","2","3"]],s.data=[["","","","1","2"]];break;case 4:n.data=[["","","","1","2"]],s.data=[["","","","1","2"]];break}e(a,r),e(a,n),e(a,s),t>4?t=0:t+=1},2e3)});const p=m();return(a,r)=>(l(),c("svg",{ref_key:"d3svg",ref:p},null,512))}});var _=o(f,[["__file","P9.vue"]]);const y=i(`<h1 id="_9-palindrome-number" tabindex="-1"><a class="header-anchor" href="#_9-palindrome-number" aria-hidden="true">#</a> 9. Palindrome Number</h1><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Input: x = 12321
Output: true
Explanation: 12321 reads as 12321 from left to right and from right to left.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,3),v=i(`<h2 id="rust-solution" tabindex="-1"><a class="header-anchor" href="#rust-solution" aria-hidden="true">#</a> Rust Solution</h2><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">impl</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">pub</span> <span class="token keyword">fn</span> <span class="token function-definition function">is_palindrome</span><span class="token punctuation">(</span><span class="token keyword">mut</span> x<span class="token punctuation">:</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token keyword">bool</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> x <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">||</span> <span class="token punctuation">(</span>x <span class="token operator">%</span> <span class="token number">10</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> x <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">while</span> x <span class="token operator">&gt;</span> y <span class="token punctuation">{</span>
            y <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">*</span> y <span class="token operator">+</span> x <span class="token operator">%</span> <span class="token number">10</span><span class="token punctuation">;</span>
            x <span class="token operator">/=</span> <span class="token number">10</span>
        <span class="token punctuation">}</span>

        x <span class="token operator">==</span> y <span class="token operator">||</span> y <span class="token operator">/</span> <span class="token number">10</span> <span class="token operator">==</span> x
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div>`,2),g={setup(u){return(p,a)=>(l(),c(h,null,[y,x(_),v],64))}};var F=o(g,[["__file","p9.html.vue"]]);export{F as default};
