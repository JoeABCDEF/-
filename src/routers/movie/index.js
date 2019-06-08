export default{
    path : '/movie',
    component : ()=>import('@/views/Movie'),
    children:[
        {
            path : 'city',
            component : ()=>import('@/components/City'),
        },
        {
            path : 'search',
            component : ()=>import('@/components/Search'),
        },
        {
            path : 'comingsoon',
            component : ()=>import('@/components/ComingSoon'),
        },
        {
            path : 'nowplaying',
            component : ()=>import('@/components/NowPlaying'),
        },
        {
            path:'detail/1/:id',
            components:{
                //当前页面 有两个路由  当没有default 时  未命名的路由没有匹配到 显示空白页
                //有了default 后 让未命名的路由在转换是  也有默认的显示东西  
                default:()=>import('@/components/NowPlaying'),
                //冒号前面的名字 是之前 给
                //<router-view name="detail" /> 的名字 自会在这进行渲染
                detail : ()=> import('@/views/Movie/detail')
            },
            props:{
                //冒号前面的名字 是之前 给
                //<router-view name="detail" /> 的名字 自会在这进行渲染
                detail : true //可减少错误发生
            }
        },
        {
            path:'detail/2/:id',
            components:{
                default:()=>import('@/components/ComingSoon'),
                //冒号前面的名字 是之前 给
                //<router-view name="detail" /> 的名字 自会在这进行渲染
                detail : ()=> import('@/views/Movie/detail')
            },
            props:{
                //冒号前面的名字 是之前 给
                //<router-view name="detail" /> 的名字 自会在这进行渲染
                detail : true //可减少错误发生
            }
        },
        {
            path : '/movie',
            redirect : 'nowplaying'
        }
    ]
}