const inputArray = document.getElementById('userInput');
const inputArrayButton = document.getElementById('getArray');
const startButton = document.getElementById('startButton');
const sortDone = document.querySelector('.done');
var arr = [];
var itmd = [];
var visited = [];
let algorithm = "mergesort"
var valid = false;

var canvas = document.getElementById("Canvas");
canvas.width = canvas.height = 500;
var canvaswidth = canvas.width;
var canvasheight = canvas.height;
var ctrl = canvas.getContext("2d");

for (var i = 0; i < arr.length; i++) {
    itmd.push(0)
    visited.push(0)
}

const performer = async () => {
    await mergeSort(0, arr.length - 1)
    // await drawBars()

    sortDone.innerText = "정렬이 끝났습니다. "
}

startButton.addEventListener('click', (e) => {
    e.preventDefault();
    algorithm = document.getElementById("sortAlgo").value;
    console.log(algorithm);
    console.log(arr);
    if(valid){
        performer();
    }
    else{
        alert("다시 입력해주세요. ")
    }

})

inputArrayButton.addEventListener('click', (e) => {
    var inputString = document.getElementById("userInput").value;
    console.log(inputString);

    const splitArray = inputString.split(',');

    console.log(splitArray)
    validateInput(splitArray);
})

async function validateInput(input){
    if(input.length < 5 || input.length > 10){
        alert("5~10개만 입력 가능합니다! 다시 입력해주세요.")
    }
    
    var a = input.every(element => {
        return !isNaN(element);
    });
    console.log(a)
    if(!a){
        alert("숫자만 입력 가능합니다! 다시 입력해주세요.");
    }
    
    arr = input;
    valid = true;

}



function mergeArray(start, end) {
    let mid = (start + end) >> 1
    let start1 = start, start2 = mid + 1
    let end1 = mid, end2 = end
     
    let index = start
 
    while (start1 <= end1 && start2 <= end2) {
        if (arr[start1] <= arr[start2]) {
            itmd[index] = arr[start1]
            index = index + 1
            start1 = start1 + 1;
        }
        else if(arr[start1] > arr[start2]) {
            itmd[index] = arr[start2]
            index = index + 1
            start2 = start2 + 1;
        }
    }
 
    while (start1 <= end1) {
        itmd[index] = arr[start1]
        index = index + 1
        start1 = start1 + 1;
    }
 
    while (start2 <= end2) {
        itmd[index] = arr[start2]
        index = index + 1
        start2 = start2 + 1;
    }
 
    index = start
    while (index <= end) {
        arr[index] = itmd[index];
        index++;
    }
}


function drawBars(start, end) {
 

    ctrl.clearRect(0, 0, 1000, 1500)
 

    for (let i = 0; i < arr.length; i++) {
 

        ctrl.fillStyle = "black"
        ctrl.shadowOffsetX = 2
        ctrl.shadowColor = "chocolate";
        ctrl.shadowBlur = 3;
        ctrl.shadowOffsetY =5;
        
         

        ctrl.fillRect(25 * i, 0, 20, arr[i] * 10)
         
        if (visited[i]) {
            ctrl.fillStyle = "#006d13"
            ctrl.fillRect(25 * i, 0, 20, arr[i] * 10)
            ctrl.shadowOffsetX = 2
        }
    }
 
    for (let i = start; i <= end; i++) {
        ctrl.fillStyle = "orange"
        ctrl.fillRect(25 * i, 0, 18, arr[i] * 10)
        ctrl.fillStyle = "#cdff6c"
        ctrl.fillRect(25 * i,0, 18, arr[i] * 10)
        visited[i] = 1
    }
}
 

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
 
 
// Merge Sorting
const mergeSort = async (start, end) => {
    if (start < end) {
        let mid = parseInt((start + end) >> 1)
        console.log(mid)
        await mergeSort(start, mid)
        await mergeSort(mid + 1, end)
        await mergeArray(start, end)
        await drawBars(start, end)
        console.log(arr)
        // console.log(itmd)

 
        await timeout(800)
    }


}