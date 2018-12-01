$(function(){
    

    $.ajax({
        url:'/api/swiper',
        dataType:'json',
        success:function(res){
            console.log(res);
            if(res.code === 1){
                //渲染swiper
                renderSwiper(res.data);
            }
        }
    })

    function renderSwiper(data){
        var str = '';
        data.forEach(function(item){
            str += `
                <div class="swiper-slide">`
            str += renderIcon(item.list);        
            str += `</div>`;
        });
        $('.swiper-wrapper').html(str);
        new Swiper('.swiper-container');
    }

    function renderIcon(list){
        return list.map(function(item){
            return `
                <dl>
                    <dt><img src="${item.url}" alt=""></dt>
                    <dd>${item.title}</dd>
                </dl>
            `
        }).join('');
    }

    //函数需要注意的四个方面：

    //1.函数需要传的参数  2.函数的功能  3.函数的返回值  4.函数在什么调用
})