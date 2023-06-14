function getSelectionSortAnimations(arr)
{
    var i, j, minIndex;

    // animations = [[COLOR ON], [COLOR OFF], ... ,[SWAP], [COLOR ON], [COLOR OFF], ... , [SWAP]]
    const animations = [];

    for (i = 0; i < arr.length-1; i++)
    {
        // Find the minimum element in unsorted array
        minIndex = i;

        for (j = i + 1; j < arr.length; j++){

            // COLOR ON: comparing minIndex and j
            animations.push([minIndex, j, "min"]);

            // COLOR OFF: comparing minIndex and j
            animations.push([minIndex, j, "min"]);

            if (arr[j] < arr[minIndex]){
                minIndex = j;
            }
        }
        
        // COLOR ON: swapping
        animations.push([minIndex, i]);
        
        animations.push([minIndex, arr[i], i, arr[minIndex]]);
        // Swap min element in unsorted array with element at index i
        var temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;

        // COLOR OFF: swapping
        animations.push([minIndex, i]);
       
    }
   
    return animations;
}

export default getSelectionSortAnimations;