import{s as x}from"./index.082e90b7.js";import{d as k,a as u}from"./matrix.a41e1099.js";import{_ as m,e as w,f as y,g,o as b,c as d,b as v,F as _,h as f}from"./app.dd4a8a2f.js";const V=w({setup(h){y(()=>{const n=x(r.value).attr("viewBox",[0,0,400,200]);var e={id:"inputMatrix",data:[[1,0,-1,0,-2,2]],x:60,y:24,cellHeight:24,cellWidth:24,cellFontSize:"8px"},l={id:"iMatrixVLine",name:"i",index:0,upper:!0},c={id:"jMatrixVLine",name:"j",index:0,upper:!0},p={id:"leftMatrixVLine",name:"l",index:0,upper:!0},t={id:"rightMatrixVLine",name:"r",index:0,upper:!0},o={id:"outputMatrix",data:[],x:60,y:72,cellHeight:24,cellWidth:24,cellFontSize:"8px"},s=[{input:[1,0,-1,0,-2,2],i:0,j:0,left:0,right:0,output:[]}];i([1,0,-1,0,-2,2],0,s);var a=0;setInterval(()=>{e.data=[s[a].input],l.index=s[a].i,c.index=s[a].j,p.index=s[a].left,t.index=s[a].right,o.data=s[a].output,k(n,e),u(n,e,l),u(n,e,c),u(n,e,p),u(n,e,t),k(n,o),a+=1,a>=s.length&&(a=0)},2e3)});function i(n,e,l){var c=[];n.sort((s,a)=>s-a);for(let s=0;s<n.length-1;s++)if(!(s>0&&n[s]==n[s-1])){for(let a=s+1;a<n.length-2;a++)if(!(a>s+1&&n[a]==n[a-1]))for(var p=a+1,t=n.length-1;p<t;){var o=n[s]+n[a]+n[p]+n[t];if(o==e){for(c.push([n[s],n[a],n[p],n[t]]),p+=1,t-=1;p<t&&n[p]==n[p-1];)p+=1;for(;p<t&&n[t]==n[t+1];)t-=1}else o<e?p+=1:o>e&&(t-=1);l.push({input:n,i:s,j:a,left:p,right:t,output:JSON.parse(JSON.stringify(c))})}}return[]}const r=g();return(n,e)=>(b(),d("svg",{ref_key:"d3svg",ref:r},null,512))}});var M=m(V,[["__file","P18.vue"]]);const j=f(`<h1 id="_18-4sum" tabindex="-1"><a class="header-anchor" href="#_18-4sum" aria-hidden="true">#</a> 18. 4Sum</h1><h2 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,3),L=f(`<h2 id="rust-solution" tabindex="-1"><a class="header-anchor" href="#rust-solution" aria-hidden="true">#</a> Rust Solution</h2><div class="language-rust ext-rs line-numbers-mode"><pre class="language-rust"><code><span class="token keyword">impl</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">pub</span> <span class="token keyword">fn</span> <span class="token function-definition function">four_sum</span><span class="token punctuation">(</span>nums<span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token keyword">i32</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> target<span class="token punctuation">:</span> <span class="token keyword">i32</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token keyword">i32</span><span class="token operator">&gt;&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> res<span class="token punctuation">:</span> <span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token class-name">Vec</span><span class="token operator">&lt;</span><span class="token keyword">i32</span><span class="token operator">&gt;&gt;</span> <span class="token operator">=</span> <span class="token macro property">vec!</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> nums<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">4</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> res<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">let</span> <span class="token keyword">mut</span> nums <span class="token operator">=</span> nums<span class="token punctuation">;</span>
        nums<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token number">0</span><span class="token punctuation">..</span>nums<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> i <span class="token operator">&gt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">for</span> j <span class="token keyword">in</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">..</span>nums<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">2</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> j <span class="token operator">&gt;</span> i <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
                    <span class="token keyword">continue</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

                <span class="token keyword">let</span> <span class="token punctuation">(</span><span class="token keyword">mut</span> left<span class="token punctuation">,</span> <span class="token keyword">mut</span> right<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">(</span>j <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span> nums<span class="token punctuation">.</span><span class="token function">len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">while</span> left <span class="token operator">&lt;</span> right <span class="token punctuation">{</span>
                    <span class="token keyword">let</span> tmp <span class="token operator">=</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> tmp <span class="token operator">==</span> target <span class="token punctuation">{</span>
                        res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span><span class="token punctuation">,</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">to_vec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        left <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                        right <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>

                        <span class="token keyword">while</span> left <span class="token operator">&lt;</span> right <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>left<span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>left <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
                            left <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                        <span class="token keyword">while</span> left <span class="token operator">&lt;</span> right <span class="token operator">&amp;&amp;</span> nums<span class="token punctuation">[</span>right<span class="token punctuation">]</span> <span class="token operator">==</span> nums<span class="token punctuation">[</span>right <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>
                            right <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> tmp <span class="token operator">&lt;</span> target <span class="token punctuation">{</span>
                        left <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> tmp <span class="token operator">&gt;</span> target <span class="token punctuation">{</span>
                        right <span class="token operator">-=</span> <span class="token number">1</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        res
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br></div></div>`,2),S={setup(h){return(i,r)=>(b(),d(_,null,[j,v(M),L],64))}};var I=m(S,[["__file","p18.html.vue"]]);export{I as default};