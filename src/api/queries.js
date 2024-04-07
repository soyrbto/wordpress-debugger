

const fetchQueries = async () => {
    try {
        const response = await fetch('http://carton-premium.local/wp-json/custom-api/v1/debug?type=queries');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(`Error fetching debug data: ${error}`);
    }
};

const deleteQueries = async () => {

    try{
       const data = await fetch('http://carton-premium.local/wp-json/custom-api/v1/queries-delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(data);
    } catch(error){
        console.log(error.data);
    }

}


export {fetchQueries, deleteQueries};