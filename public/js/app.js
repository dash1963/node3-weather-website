const clog = console.log;

clog('Client side javascript just loaded!!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para1 = document.getElementById('para-1');
const para2 = document.getElementById('para-2');


const getWeather = (address) =>
{
fetch(`http://localhost:3000/weather?address=${address}`).then( (response) => {
  response.json().then((data) => {
      if (data.error) {
          para1.textContent = data.error;
      } else {
        para1.textContent = data.location;
        para2.textContent = data.forecast
      }
  })
});
}

weatherForm.addEventListener('submit', (event) => {
 event.preventDefault();
 para1.textContent = 'loading ......';
 para2.textContent = ''; 
 const location = search.value;
 getWeather(location);
});