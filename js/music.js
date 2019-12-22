
window.onload = function () {
// 	document.querySelector('.song-list').addEventListener('touchmove',function(e){ 

// 	e.preventDefault();

// });
// document.querySelector('.comment').addEventListener('touchmove',function(e){ 

// 	e.preventDefault();

// });
    /*区域滚动效果*/
    /*条件：一个容器装着一个容器html结构*/
    /*找到大容器*/
    /*子容器大于父容器*/
    new IScroll(document.querySelector('.song-list'),{
        scrollX:false,
        scrollY:true
    });
    new IScroll(document.querySelector('.comment'),{
        scrollX:false,
        scrollY:true 
    });
	
	// 使用Vue进行数据绑定和渲染
	 var vm = new Vue({
	 	el: ".musicbox",
	 	data: {
	 		query:"",
	 		songlist:[],
	 		musicurl:"",
	 		imgsrc:"",
	 		isShow:false,
	 		commentinfo:[],
	 		isPlay:false,
	 		mvsrc:""
	 	},
	 	methods: {
	 		search(){
	 			axios.get("https://autumnfish.cn/search?keywords="+this.query).then(
	 			(res)=>{
	 				console.log(res.data.result.songs);
	 				this.songlist=res.data.result.songs;
	 			}
	 			)
	 		},
	 		playmusic(id){
	 			axios.get("https://autumnfish.cn/song/url?id="+id).then(
	 			(res)=>{
	 				console.log(res.data.data[0].url)/* 得到歌曲链接 */
	 				this.musicurl=res.data.data[0].url;
	 			}
	 			);
	 			axios.get("https://autumnfish.cn/song/detail?ids="+id).then(
	 			(res)=>{
	 				console.log(res.data.songs[0].al.picUrl)/* 得到歌曲封面链接 */
	 				this.imgsrc=res.data.songs[0].al.picUrl;
	 			}
	 			);
	 			axios.get("https://autumnfish.cn/comment/hot?type=0&id="+id).then(
	 			(res)=>{
	 				console.log(res.data.hotComments)/* 得到热门评论 */
	 				this.commentinfo=res.data.hotComments;
	 			}
	 			)
	 		},
	 		play(){
	 			this.isPlay=true;
	 		},
	 		pause(){
	 			this.isPlay=false;
	 		},
	 		playMv(mvid){
	 			axios.get("https://autumnfish.cn/mv/url?id="+mvid).then(
	 			(res)=>{
	 				console.log(res.data.data.url)/* 得到mv链接 */
	 			this.mvsrc=res.data.data.url;
	 			this.isShow=true;
	 			}
	 			);
	 		},
	 		hide(){
	 			this.isShow=false;
				// 点击隐藏遮罩层时MV地址为空就停播放了
	 			this.mvsrc=""
				
	 		}
	 		
	 	}
	 })
}

