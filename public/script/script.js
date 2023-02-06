const loginButton = document.getElementById("login")
const main = document.querySelectorAll("main");
const xMark = document.getElementById("iconSatu");
const xMarkDua = document.getElementById("iconDua");
const regisLogin = document.querySelector(".submit-three");
const loginRegis = document.querySelector(".loginRegis");
const loading = document.getElementById("preloader");
const submitSatu = document.getElementById("submit-one")
const xMarkTiga = document.getElementById('iconEmpat');
const detail = document.getElementById('detail');

const iconInfo = document.getElementById('info');

loginButton.addEventListener('click',function(){
  for(const m of main){
    m.classList.add("blur")
  }
  document.getElementById("form-login").style.display = "inline-block";
})

xMark.addEventListener('click',function(){
  for(const m of main){
    m.classList.remove("blur")
  }
  document.getElementById("form-login").style.display = "none";
})

regisLogin.addEventListener('click',function(){
  document.getElementById("form-login").style.display = "none";
  document.getElementById("form-regis").style.display = "inline-block";
})

xMarkDua.addEventListener('click',function(){
  for(const m of main){
    m.classList.remove("blur")
  }
  document.getElementById("form-regis").style.display = "none";
})

loginRegis.addEventListener('click', function(){
  document.getElementById("form-regis").style.display = "none";
  document.getElementById("form-login").style.display = "inline-block";
})

window.onload = function(){
  setTimeout(() => {
    loading.style.display = "none";
  }, 300);
  console.log("tex")
  
}

// const passSalah = document.getElementById('passwordSalah')
// passSalah.addEventListener('load',function(){
//   console.log('okeeeeeeeeeeeeee')
// })
//   window.addEventListener('load',function(){
//     console.log('pas salahhh')
//     Swal.fire({
//       icon: 'error',
//       title: 'Passsword atau email anda salah',
//       text: 'Mohon coba Lagi atau daftar untuk membuat akun',
//     })
//   })

submitSatu.addEventListener('click',function(){
  loading.fadeOut = "slow";
  console.log("oke")
})

console.log(submitSatu)
window.addEventListener('DOMContentLoaded',function(){
  loading.style.display = "none";
});

const startButton = document.getElementById('getstarted');
startButton.addEventListener('click',function(){
  console.log('oke')
})

xMarkTiga.addEventListener('click',function(){
  document.getElementById("error-notif").style.display = "none";
})

// function icon(){
//   console.log('oke');
//   detail.style.display = "inline-block";
//   for(const m of main){
//     m.classList.add("blur")
//   }
// }

// function closeDetail(){
//   detail.style.display = "none";
//   for(const m of main){
//     m.classList.remove("blur")
//   }
// }