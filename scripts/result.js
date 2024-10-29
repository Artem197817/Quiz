(function (){
    const Result = {
        init: function(){
            const url = new URL(location.href);
            document.getElementById('result-scope').innerText =
                url.searchParams.get('score') + '/' + url.searchParams.get('total') ;

        }
    }
Result.init();
})()