function getBubbleSortAnimations(arr){
    const arrayToSort = [];

    for(let i = 0; i < arr.length; i++){
        arrayToSort.push([arr[i],i]);
    }
    
    const animations = [];

    var i, j, temp;
    var swapped;
    for (i = 0; i < arrayToSort.length - 1; i++)
    {
        swapped = false;
        for (j = 0; j < arrayToSort.length - i - 1; j++)
        {
            // Turn color on animation
            animations.push([j, j+1]);

            if (arrayToSort[j][0] > arrayToSort[j + 1][0])
            {
                const barOne = arrayToSort[j];
                const barTwo = arrayToSort[j+1];

                // Index of barOne, New height of bar One, Index of barTwo, New height of bar Two
                animations.push([j, barTwo[0], j+1, barOne[0]]);

                // Swap animations
                arrayToSort[j] = barTwo;
                arrayToSort[j + 1] = barOne;
                swapped = true;
            } else {
                const barOne = arrayToSort[j];
                const barTwo = arrayToSort[j+1];

                // Index of barOne, New height of bar One, Index of barTwo, New height of bar Two
                animations.push([j, barOne[0], j+1, barTwo[0]]);
            }

             // Turn color off animation
             animations.push([j, j+1]);
        }
       
        // IF no two elements were
        // swapped by inner loop, then break
        if (swapped === false)
        break;
    }
    
    return animations;
}

export default getBubbleSortAnimations;