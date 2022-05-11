import{s as b}from"./index.082e90b7.js";import{d as o,a as c}from"./matrix.a41e1099.js";import{_ as r,e as m,f as x,g as h,o as u,c as i,b as f,F as g,h as k}from"./app.dd4a8a2f.js";const _=m({setup(d){x(()=>{const n=b(l.value).attr("viewBox",[0,0,400,200]);var t={id:"inputMatrix",data:[["b","a","b","a","d"]],x:60,y:24,cellHeight:24,cellWidth:24,cellFontSize:"8px"},s={id:"leftMatrixVLine",name:"l",index:0,upper:!0},a={id:"rightMatrixVLine",name:"r",index:0,upper:!1},p={id:"outputMatrix",data:[["","","","",""]],x:60,y:72,cellHeight:24,cellWidth:24,cellFontSize:"8px"};o(n,t),c(n,t,s),c(n,t,a),o(n,p);var e=0;setInterval(()=>{switch(e){case 0:s.index=0,a.index=0,p.data=[["","","","",""]];break;case 1:s.index=0,a.index=0,p.data=[["","","","",""]];break;case 2:s.index=1,a.index=1,p.data=[["","","","",""]];break;case 3:s.index=0,a.index=2,p.data=[["b","a","b","",""]];break;case 4:s.index=2,a.index=2,p.data=[["b","a","b","",""]];break;case 5:s.index=1,a.index=3,p.data=[["b","a","b","",""]];break;case 6:s.index=3,a.index=3,p.data=[["b","a","b","",""]];break;case 7:s.index=4,a.index=4,p.data=[["b","a","b","",""]];break}o(n,t),c(n,t,s),c(n,t,a),o(n,p),e>7?e=0:e+=1},2e3)});const l=h();return(n,t)=>(u(),i("svg",{ref_key:"d3svg",ref:l},null,512))}});var w=r(_,[["__file","P5.vue"]]);const v=k(`<h1 id="_5-longest-palindromic-substring" tabindex="-1"><a class="header-anchor" href="#_5-longest-palindromic-substring" aria-hidden="true">#</a> 5. Longest Palindromic Substring</h1><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Input: s = &quot;babad&quot;
Output: &quot;bab&quot;
Explanation: &quot;aba&quot; is also a valid answer.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,3),y=k(`<h2 id="rust-solution" tabindex="-1"><a class="header-anchor" href="#rust-solution" aria-hidden="true">#</a> Rust Solution</h2><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">impl</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">pub</span> <span class="token keyword">fn</span> <span class="token function-definition function">longest_palindrome</span><span class="token punctuation">(</span>s<span class="token punctuation">:</span> <span class="token class-name">String</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token class-name">String</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> s<span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">&gt;</span> <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">chars</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> len <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> len <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> start <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> end <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token number">0</span><span class="token punctuation">..</span>s<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">let</span> <span class="token keyword">mut</span> left <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token keyword">let</span> <span class="token keyword">mut</span> right <span class="token operator">=</span> i<span class="token punctuation">;</span>
            <span class="token keyword">while</span> right <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> len <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">[</span>right <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> s<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token punctuation">{</span>
                right <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">while</span> right <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;</span> len <span class="token operator">&amp;&amp;</span> left <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">[</span>right <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">==</span> s<span class="token punctuation">[</span>left <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
                right <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                left <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> right <span class="token operator">-</span> left <span class="token operator">&gt;</span> end <span class="token operator">-</span> start <span class="token punctuation">{</span>
                end <span class="token operator">=</span> right<span class="token punctuation">;</span>
                start <span class="token operator">=</span> left<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        s<span class="token punctuation">[</span>start<span class="token punctuation">..=</span>end<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">iter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div>`,2),M={setup(d){return(l,n)=>(u(),i(g,null,[v,f(w),y],64))}};var L=r(M,[["__file","p5.html.vue"]]);export{L as default};