import React, { useState } from "react";
import './SortingVisualizer.css'
import getMergeSortAnimations from "../Algorithms/MergeSort";
import getBubbleSortAnimations from "../Algorithms/BubbleSort";
import getSelectionSortAnimations from "../Algorithms/SelectionSort";

// This is the main color of the array bars.
const PRIMARY_COLOR = '#075F82';   // blue:  3D7C91
 
// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#F589C6';


function SortingVisualizer(){

     // state of array size
     const [arrSize, setArrSize] = useState(() => 100);

     // speed of animations
     const [animationSpeed, setAnimationSpeed] = useState(() => -5);

     const ANIMATION_SPEED = animationSpeed * -1;

    // Initial array that will be rendered when the project is started
    const initialArray = [];

    // construct random array
    for(let i = 0; i < arrSize; i++){
        initialArray.push(randomIntFromInterval(50,700));
    }
   
    // state of the array
    const [arr, setArr] = useState(() => initialArray);

    // function that generates a random array used to reset / re-generate array
    function resetArray(){
        const arr = []

        for(let i = 0; i < arrSize; i++){
            arr.push(randomIntFromInterval(50,700));
        }

        const arrayBars = document.getElementsByClassName('bar');
        for(let i = 0; i < arrayBars.length; i++){
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }

        setArr(arr);
    }

    function mergeSort() {
        // get animations
        const animations = getMergeSortAnimations(arr);

        // calculate time it takes to run through the animations
        const time = animations.length * ANIMATION_SPEED;

        for (let i = 0; i < animations.length; i++) {

          const arrayBars = document.getElementsByClassName('bar');

          const isColorChange = i % 3 !== 2;

          if (isColorChange) {
            // deconstruct animation
            const [barOneIdx, barTwoIdx] = animations[i];

            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;

            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

            // animation
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED);

          } else {

            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED);

          }
        }        

        // change color of all bars to green indicating completion of sorting
        setTimeout(completedSortingAnimation, time);
    }

    function bubbleSort(){
        const arrCopy = arr.slice();
        
        // get animations
        // animations array looks like: [[COLOR ON],[COLOR OFF],[SWAP],[COLOR ON],[COLOR OFF],[SWAP],...]
        const animations = getBubbleSortAnimations(arrCopy);

        // calculate time it takes to complete the animations
        const time = animations.length * ANIMATION_SPEED;

        // variable indicating if any bars are red as of now
        let status = "OFF";

        for(let i = 0; i < animations.length; i++){

            const arrayBars = document.getElementsByClassName('bar');

            if(animations[i].length === 4){

                // swap animation
                setTimeout(() => {
                    const [barOneIdx, barOneNewHeight, barTwoIdx, barTwoNewHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${barOneNewHeight}px`;
                    barTwoStyle.height = `${barTwoNewHeight}px`;
                  }, i * ANIMATION_SPEED);

            } else {

                // color change animation
                const [barOneIdx, barTwoIdx] = animations[i];

                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                
                const color = status === "OFF" ? SECONDARY_COLOR : PRIMARY_COLOR;

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED);

                // Change status
                if(status === "OFF"){
                    status = "ON";
                } else {
                    status = "OFF";
                }
            }
        }

        // change color of all bars to green indicating completion of sorting
        setTimeout(completedSortingAnimation, time);
    }

    function selectionSort(){
       const animations = getSelectionSortAnimations(arr.slice());

       const time = animations.length * ANIMATION_SPEED;
        
       let status = "OFF";
       let minStatus = "OFF";

       for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('bar');

            // swap animation
            if(animations[i].length === 4){
                setTimeout(() => {
                    const [barOneIdx, barOneNewHeight, barTwoIdx, barTwoNewHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.height = `${barOneNewHeight}px`;
                    barTwoStyle.height = `${barTwoNewHeight}px`;
                }, i * ANIMATION_SPEED);
            } else {
                if(animations[i].length === 3){
                    // finding min animations
                    
                    const [barOneIdx, barTwoIdx, str] = animations[i];

                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;

                    const color = minStatus === "OFF" ? SECONDARY_COLOR : PRIMARY_COLOR;

                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * ANIMATION_SPEED);

                    // Change status
                    if(minStatus === "OFF"){
                        minStatus = "ON";
                    } else {
                        minStatus = "OFF";
                    }

                } else {
                    // color change animation

                    const [barOneIdx, barTwoIdx] = animations[i];

                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;

                    const color = status === "OFF" ? "#B799FF" : PRIMARY_COLOR;

                    setTimeout(() => {
                        barOneStyle.backgroundColor = color;
                        barTwoStyle.backgroundColor = color;
                    }, i * ANIMATION_SPEED);

                    // Change status
                    if(status === "OFF"){
                        status = "ON";
                    } else {
                        status = "OFF";
                    }

                }
                
            }
            
        }

        setTimeout(completedSortingAnimation, time);
    }

    function completedSortingAnimation(){
        const arrayBars = document.getElementsByClassName('bar');
        for(let i = 0; i < arrayBars.length; i++){
            arrayBars[i].style.backgroundColor = "#9BA2FF";
        }
    }

    
    return(
    <>
        <div className="bar-container">
            {arr.map((value, idx) => (
                <div
                    className="bar"
                    key={idx}
                    style={{
                    backgroundColor: PRIMARY_COLOR,
                    height: `${value}px`,
                    width: `${window.innerWidth / (arrSize * 1.5)}px`
                    }}>        
                </div>
            ))}
        </div>

        <nav className="navbar">
            <div className="row">
                <div className="col-lg"> <h1 className="navbar-brand mb-0 h1" style={{paddingRight: 5, paddingLeft: 5, }}>VisualSort</h1> </div>
                <div className="col-lg"> <button className="button-options" onClick={resetArray}>New Array</button> </div>
                <div className="col-lg"> <button className="button-options" onClick={mergeSort}>Merge Sort</button> </div>
                <div className="col-lg"> <button className="button-options" onClick={bubbleSort}>Bubble Sort</button> </div>
                <div className="col-lg"> <button className="button-options" onClick={selectionSort}>Selection Sort</button> </div>
                <div className="col-lg"> 
                    <div id="wrapper">
                        <div className="inner">
                            <p className="button-options" style={{marginTop: 5, marginBottom: 10}}>Size</p>
                            <input 
                            type="range" 
                            min="10" 
                            max="200" 
                            id="changeSize" 
                            value={arrSize} 
                            onChange={(e) => 
                                {setArrSize(e.target.value);
                                resetArray()}}/>
                        </div>

                        <div className="inner">
                            <p className="button-options" style={{marginTop: 5, marginBottom: 10}}>Speed</p>
                            <input 
                            type="range" 
                            min="-150" 
                            max="-1" 
                            id="changeSize" 
                            value={animationSpeed} 
                            onChange={(e) => 
                                {setAnimationSpeed(e.target.value);}}/>
                        </div>
                       
                    </div>
                </div>
            </div>      

         
        </nav>

    </>
    );
}

// Function to generate a random integer between min and max both included
// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;