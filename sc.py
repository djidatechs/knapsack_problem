

w= (2, 2, 1,2,4)
p= (30,40,50,60,70 )
C= 10
#sol = 15170
assert len(w) == len(p)


n = len(w)
dp = [None]*(n+1)
for k in range( n+1)  : 
    dp [k] = [0]*(C+1)

for i in range(1,n+1) : 
    for   j in range(1,C+1) : 
        if ( w[i-1] >  j) : 
            dp[i][j] = dp[i-1][j]
        else : 
            dp[i][j] = max(dp[i-1][j-w[i-1]] + p[i-1]  ,dp[i-1][j]  )
         

print(dp[n][C])