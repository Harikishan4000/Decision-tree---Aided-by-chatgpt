const form=document.querySelector('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const fd=new FormData(form);

    const URLdata= new URLSearchParams(fd).toString();
    // console.log(URLdata);
    fetch('http://localhost:5000/upload', {
        method: "POST",
        body: URLdata,
        headers:{
            'Content-type': 'application/x-www-form-urlencoded',
        }

    })
})
