// 定义和引入 api 的键值，后面可以根据情况变化 Give api a key value, can change afterwards.
const openWeatherApi ='db1f53219cee52a111e407c0e9c57ba8';
const flickrApi = 'd083b02f7d83d378415d1feaed72229c';
//把界面和常量对应起来. create the  connection of layout and const.
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');



window.addEventListener('load', ()=>{
    //经度和维度，longitude and latitude.
    let long;
    let lat;
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{

            long = position.coords.longitude;
            lat = position.coords.latitude;
            //访问api 的地址，由insomnia验证过，在console中可以得到json数据,visit api url address, tested by insomnia, can get json data in console.
            const apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${openWeatherApi}&units=metric`;
            console.log(apiUrl);

            //使用fetch方法来获取json数据,获取响应。use fetch method to get json data, get the response.
            fetch(apiUrl).then((response)=>{
                return response.json();
            })
            .then((data)=>{
                // 传送数据。 send the data to different areas in layout.
                const{temp} = data.main;
                const place = data.name;
                const {description, icon} =data.weather[0];
                const {sunrise,sunset} = data.sys;
               // icon api from openweathermap.org
                const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                const fahrenheit =(temp * 9) / 5 + 32;

                const sunriseGMT = new Date(sunrise *1000);
                const sunsetGMT = new Date(sunset *1000);

                
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(0)} °C`;
          tempF.textContent = `${fahrenheit.toFixed()} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
            });
        });
    }
});
     

