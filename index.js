const inputslider = document.querySelector("[data-lengthSlider]");
const lengthdispaly = document.querySelector("[data-lengthNumber]");
const passworddispaly = document.querySelector("[data-passwordDisplay]")
const copybtn = document.querySelector("[data-copy]");
const copymsg = document.querySelector("[data-copyMessage]");
const uppercase =document.querySelector('#uppercase');
const lowercase =document.querySelector('#lowercase');
const symbols =document.querySelector('#symbols');
const numbers =document.querySelector('#numbers');
const indicator = document.querySelector('.data-indicator');
const generatebtn = document.querySelector('.generate-button');
const allcheckbox = document.querySelector("input[type = checkbox]");
let symbolstring = "<@!#$%^&*()>?_+-*/+{}L:<>{?>/.;'[]=-";

let password = "";
let passwordlength = 10;
let checkcount = 1;
sliderhandler();

//set strength color grey
setindicator("#ccc");
//slider handler
function sliderhandler()
{
    inputslider.value = passwordlength;
    lengthdispaly.innerText = passwordlength;
    const min=inputslider.min;
    const max=inputslider.max;
    inputslider.style.backgroundSize= ((passwordlength-min)*100/(max-min))+"% 100%";
}

function setindicator(color)
{
    indicator.style.backgroundColor = color;
    //also set shadow
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`
}

function getrndInt(min,max)
{
    return Math.floor(Math.random()*(max-min))+min;
}
function generatenumber()
{
    return getrndInt(0,9);
}
function generatelowercase()
{
    return String.fromCharCode(getrndInt(97,123));

}
function generateuppercase()
{
    return String.fromCharCode(getrndInt(65,91));
}
function generatesymbol()
{
    const ramdum = getrndInt(0,symbolstring.length);
    return symbolstring.charAt(ramdum);
}

function calcstrength()
{
    let hasupper = false;
    let haslower = false;
    let hasnumber = false;
    let hassymbol = false;
//.checked is used to check whether a checkbox is checked or not
    if(uppercase.checked) hasupper=true;
    if(lowercase.checked) haslower=true;
    if(symbols.checked) hassymbol=true;
    if(numbers.checked) hasnumber=true;

if(haslower && hasupper && (hasnumber || hassymbol) && passwordlength>=8) setindicator("#0f0");
else if (
    (haslower|| hasupper) && (hasnumber || hassymbol) && passwordlength>=6) setindicator("#ff0");
    else setindicator("#f00");

}
function shuffle(array)
{
    //fisher yates method
    for(let i=array.length-1;i>0;i--)
    {
        const j = Math.floor(Math.random()*(i+1));
        const temp =array[i];
        array[i]=array[j];
        array[j]=temp;
    }
let str="";
array.forEach((el)=>(str += el));
return str;
}

async function copycontent()
{
    try{
  await navigator.clipboard.writeText(passworddispaly.value);
copymsg.innerText = "copied";
    }
    catch(e)
    {
        copymsg.innerText = "Failed";
    }
    //to make copied wala msg copied
    copymsg.classList.add("active");
    setTimeout(()=>copymsg.classList.remove("active"),2000);
}
 
generatebtn.addEventListener('click',generatePassword);

copybtn.addEventListener('click',()=>
{
    if(passworddispaly.value)copycontent();
    else window.alert("No Password Generated");
});

inputslider.addEventListener('input',(e)=>
{
    passwordlength = e.target.value;
    sliderhandler();

})
function handlecheckboxxhange()
{
checkcount = 0;

    if(uppercase.checked) checkcount++;
    if(lowercase.checked) checkcount++;
    if(symbols.checked) checkcount++;
    if(numbers.checked) checkcount++;

//speacial condition
if(passwordlength<checkcount){
     passwordlength=checkcount;
sliderhandler();}
};

uppercase.addEventListener('change',handlecheckboxxhange);
lowercase.addEventListener('change',handlecheckboxxhange);
symbols.addEventListener('change',handlecheckboxxhange);
numbers.addEventListener('change',handlecheckboxxhange);
function generatePassword()
{
    //none of the checkbox are selected
    if(checkcount<=0) return ;
    if(passwordlength<checkcount)
    {
        passwordlength = checkcount;
        sliderhandler();

    }
    //start the journey to start new password
    password="";
    let functionarr=[];
    if(uppercase.checked) functionarr.push(generateuppercase);
    if(lowercase.checked) functionarr.push(generatelowercase);
    if(symbols.checked) functionarr.push(generatesymbol);
    if(numbers.checked) functionarr.push(generatenumber);

//compulsory additiion
for(let i=0;i<functionarr.length;i++)
{
    password += functionarr[i]();
}
//remaining
for(let i=0;i<passwordlength-functionarr.length;i++)
{
    let randind = getrndInt(0,functionarr.length);
    password+=functionarr[randind]();
}


password = shuffle(Array.from(password));
passworddispaly.value = password;
console.log(password);
calcstrength();
}









