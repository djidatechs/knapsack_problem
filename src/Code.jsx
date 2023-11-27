import React from 'react';

function Code(props) {
    return (
        <div class="mockup-code bg-slate-900 text-white">
  
            <pre  data-prefix="0"><code>####code snippet####</code></pre>
            <pre        data-prefix=""><code><br /></code></pre>
            <pre className='code_line_x' data-prefix="1"><code>dp = [None]*(n+1)</code></pre>
            <pre className='code_line_x' data-prefix="2"><code>for k in range( n+1)  : </code></pre>
            <pre className='code_line_x' data-prefix="3"><code>   dp [k] = [0]*(C+1)</code></pre>
            <pre className='code_line_if_1' data-prefix="4"><code>for i in range(1, n + 1) :</code></pre>
            <pre className='code_line_if_1'  data-prefix="5"><code>  for j in range(1, C + 1) :</code></pre>
            <pre className='code_line_if' data-prefix="6"><code>      if (w[i - 1] &gt; j) :</code></pre>
            <pre className='code_line_if' data-prefix="7"><code>          dp[i][j] = dp[i - 1][j]</code></pre>
            <pre className='code_line_else' data-prefix="8"><code>      else :</code></pre>
            <pre className='code_line_else' data-prefix="9"><code>          dp[i][j] = max(dp[i - 1][j - w[i - 1]]<br/>                + p[i - 1], dp[i - 1][j])</code></pre>
        </div>
    );
}

export default Code;