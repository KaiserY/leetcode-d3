import{s as y}from"./index.082e90b7.js";import{d as a,a as i}from"./matrix.a41e1099.js";import{_ as h,e as w,f as M,g as C,o as x,c as _,b as I,F as V,h as f}from"./app.dd4a8a2f.js";const X=w({setup(v){M(()=>{const n=y(k.value).attr("viewBox",[0,0,400,200]);var t={id:"inputMatrix",data:[[1,9,9,4]],x:60,y:96,cellHeight:24,cellWidth:24,cellFontSize:"8px"},s={id:"symbolMatrix",data:[[1e3,900,500,400,100,90,50,40,10,9,5,4,1],["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"]],x:60,y:24,cellHeight:24,cellWidth:24,cellFontSize:"8px"},o={id:"symbolMatrixVLine",name:"i",index:0,upper:!0},l={id:"outputMatrix",data:[["","","",""]],x:60,y:144,cellHeight:24,cellWidth:24,cellFontSize:"8px"};a(n,t),a(n,s),i(n,s,o),a(n,l);var e=0,c=1994,d=[1e3,900,500,400,100,90,50,40,10,9,5,4,1],g=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"],r=[1,9,9,4],u=["","","",""],m=0,p=!1;setInterval(()=>{if(p=!1,e>=d.length){e=0,c=1994,r=[1,9,9,4],u=["","","",""],m=0,o.index=e,t.data=[r],l.data=[u],p||(a(n,t),a(n,s),i(n,s,o),a(n,l),p=!0);return}o.index=e;var b=Math.floor(c/d[e]);for(c%=d[e],r=("   "+c).slice(-4).split(""),t.data=[r];b>0;)u[m]=g[e],l.data=[u],p||(a(n,t),a(n,s),i(n,s,o),a(n,l),p=!0),m+=1,b-=1;p||(a(n,t),a(n,s),i(n,s,o),a(n,l),p=!0),e+=1},2e3)});const k=C();return(n,t)=>(x(),_("svg",{ref_key:"d3svg",ref:k},null,512))}});var L=h(X,[["__file","P12.vue"]]);const D=f(`<h1 id="_12-integer-to-roman" tabindex="-1"><a class="header-anchor" href="#_12-integer-to-roman" aria-hidden="true">#</a> 12. Integer to Roman</h1><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Input: num = 1994
Output: &quot;MCMXCIV&quot;
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,3),S=f(`<h2 id="rust-solution" tabindex="-1"><a class="header-anchor" href="#rust-solution" aria-hidden="true">#</a> Rust Solution</h2><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">impl</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">pub</span> <span class="token keyword">fn</span> <span class="token function-definition function">max_area</span><span class="token punctuation">(</span>height<span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token keyword">i32</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token keyword">i32</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> l <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> r <span class="token operator">=</span> height<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> max_area <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> l <span class="token operator">&lt;</span> r <span class="token punctuation">{</span>
            <span class="token keyword">let</span> width <span class="token operator">=</span> <span class="token punctuation">(</span>r <span class="token operator">-</span> l<span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token keyword">i32</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> height<span class="token punctuation">[</span>l<span class="token punctuation">]</span> <span class="token operator">&lt;</span> height<span class="token punctuation">[</span>r<span class="token punctuation">]</span> <span class="token punctuation">{</span>
                max_area <span class="token operator">=</span> <span class="token namespace">std<span class="token punctuation">::</span>cmp<span class="token punctuation">::</span></span><span class="token function">max</span><span class="token punctuation">(</span>max_area<span class="token punctuation">,</span> height<span class="token punctuation">[</span>l<span class="token punctuation">]</span> <span class="token operator">*</span> width<span class="token punctuation">)</span><span class="token punctuation">;</span>
                l <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                max_area <span class="token operator">=</span> <span class="token namespace">std<span class="token punctuation">::</span>cmp<span class="token punctuation">::</span></span><span class="token function">max</span><span class="token punctuation">(</span>max_area<span class="token punctuation">,</span> height<span class="token punctuation">[</span>r<span class="token punctuation">]</span> <span class="token operator">*</span> width<span class="token punctuation">)</span><span class="token punctuation">;</span>
                r <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        max_area
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div>`,2),F={setup(v){return(k,n)=>(x(),_(V,null,[D,I(L),S],64))}};var H=h(F,[["__file","p12.html.vue"]]);export{H as default};