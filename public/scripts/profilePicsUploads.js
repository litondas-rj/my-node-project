window.onload=function(){
  
    let baseCropping=$('#cropedImge').croppie({
        viewport:{
            width:200,
            height:200,
            type:'circle'
        },
        boundary:{
            width:300,
            height:300
        },
        showZoomer:true
    })
    
     function readableFile(file){
        let reader=new FileReader()
        reader.onload=function(event){
            baseCropping.croppie('bind',{
                url:event.target.result
            }).then(()=>{
                $('.cr-slider').attr({
                    'min':0.5000,
                    'max':1.5000
                })
            })
        }
       return reader.readAsDataURL(file)
    }
    
    $('#profileFile').on('change',function(){
        if(this.files[0]){
            readableFile(this.files[0])
            $('#crop-modal').modal('show',{
                backdrop:'static',
                keyboard:false
            })
        }
    })

    $('#cancel-cropping').on('click',function() {
        $('#crop-modal').modal('hide')
        setTimeout(()=>{
            baseCropping.croppie('destroy')
        },1000)
    })



    $('#upload').on('click',function(){
        baseCropping.croppie('result',{ type: 'blob' })
        .then(blob=>{
            try {
                let formData=new FormData()
                let file=document.getElementById('profileFile').files[0]
                let name=generateFileName(file.name)
                formData.append('profilePics', blob, name)
                
                let headers=new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                })
                console.log('data here',headers);
                
    
                
                let req= new Request("/upload/profilePics",{
                    method:'Post',
                    headers,
                    mode:'cors',   
                    body:formData
                })
                
                return fetch(req)   
                   
        } catch (error) {
            console.error("Something went wrong:", error);
            throw error;
        }
        })
    .then(res=>res.json())
       .then(data => {
         console.log("Server Response:", data); // Inspect the response in the console
         document.getElementById('removeProfile').style.display='d-block'
         document.getElementById('profilePics').src=data.profilePics
         document.getElementById('profilePicsForm').requestFullscreen()
 
         $('#crop-modal').modal('hide',function(){
            setTimeout(()=>{
             baseCropping.croppie('destroy')
            },1000)
         })
         
         return response.json(); // Try to parse it anyway (will still throw the error, but you'll see the response)
       })
        
    })
}

function generateFileName(name){
    let type=/(.jpeg|.jpg|.png|.gif)/
    return name.replace(type,'.png')
}