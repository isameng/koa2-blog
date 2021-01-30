#koa2 + ejs blog

mysql + sequelize
redis
session cookie (jwt)
jest

##开发环境
eslint
inspect 调试
404 error

author ameng


      <!-- 微博列表 -->
            <% if (blogData.isEmpty) { %>
                <div>
                    <center>暂无数据</center>
                </div>
            <% } else { %>
                <!-- 微博列表 -->
                <div id="container-weibo-list" class="weibo-list">
                    <%- include('widgets/blog-list', {
                        blogList: blogData.blogList,
                        canReply: true
                    })%>
                </div> <!-- 微博列表 结束 -->
                <!-- 加载更多 -->
                <% if (blogData.count > blogData.blogList.length) { %>
                    <%- include('widgets/load-more', {
                        pageSize: blogData.pageSize,
                        pageIndex: blogData.pageIndex,
                        count: blogData.count,
                        containerSelector: '#container-weibo-list',
                        api: '/api/blog/loadMore',
                    })%>
                <% } %> <!-- 加载更多 结束 -->
            <% } %>



                      <!-- 个人信息 -->
            <div class="right-item">
                <%- include('widgets/user-info', {
                    userInfo: userData.userInfo,
                    isMe: true,
                    amIFollowed: false,
                    atCount: userData.atCount
                });%>
            </div>

            <!-- 粉丝 -->
            <%- include('widgets/fans', {
                count: userData.fansData.count,
                userList: userData.fansData.list
            })%>

            <!-- 关注 -->
            <%- include('widgets/followers', {
                count: userData.followersData.count,
                userList: userData.followersData.list
            })%>



           amIFollowed: userData.amIFollowed,
                    atCount: userData.atCount


         <!-- 粉丝 -->
            <%- include('widgets/fans', {
                count: userData.fansData.count,
                userList: userData.fansData.list
            })%>

            <!-- 关注 -->
            <%- include('widgets/followers', {
                count: userData.followersData.count,
                userList: userData.followersData.list
            })%>