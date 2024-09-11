import { useEffect, useState } from "react"


const localCache = {

};


const useFetch = ( url ) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null,
        author: null,
        quote: null,
    });

    useEffect(() => {
        getFetch();
    }, [ url ]);

    const setLoadingState  = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null,
            author: null,
            quote: null,
        })
    }


    const getFetch = async (  ) =>{

        if( localCache[url]){
            console.log('Usando cache');
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null,
                author: null,
                quote: null,
            })


            return;
        }

        setLoadingState();

        const resp  = await fetch( url );

        // sleep(2000);
        await new Promise( resolve => setTimeout(resolve, 500));

        if (!resp.ok){
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    msg: resp.statusText
                },
                author: null,
                quote: null,
            })
            return;
        }

        const data = await resp.json();
        setState({
            data,
            isLoading: false,
            hasError: false,
            error: null,
            author: null,
            quote: null,
        })

        // Manejo del cache
        localCache[url] = data;

    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
        quote: state.quote,
        author: state.author,

    }
}

export default useFetch
