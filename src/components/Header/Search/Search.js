import React,{useState, useEffect} from 'react';
import { Search as SearchSU, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { size } from 'lodash';
import { useQuery } from '@apollo/client';
import { SEARCH } from '../../../gql/user';
import ImageNotFound from '../../../assets/png/avatar.png'
import './Search.scss';

export default function Search(props){
    const [search, setSearch] = useState(null)
    const [result, setResult] = useState([])
    const {data, loading} = useQuery(SEARCH,{
        variables:{search}
    })
    
    useEffect(() => {
        if(size(data?.search) > 0 ){
            const users = [];
            data.search.forEach( (user, index) => {
                users.push({
                    key:index,
                    title:user.name,
                    username: user.username,
                    avatar: user.avatar
                })
            } )
            setResult(users)
        }else{
            setResult([])
        }
    }, [data])


    const onChange = (e) => {
        if(e.target.value) setSearch(e.target.value)
        else setSearch(null)
    }

    const handlerResultSelect = () => {
        setSearch(null)
        setResult([])
    }

    return(
        <SearchSU
        className="search-user"
        fluid
        input={{icon:"search", iconPosition:"left"}}
        onSearchChange={ onChange }
        loading={loading}
        value={search  || '' }
        results={result}
        onResultSelect={handlerResultSelect}
        resultRenderer={(e) => <ResultSearch data={e} />}
        />
    )
}


function ResultSearch(props){
    const { data } = props;
    
    return(
        <Link className="search-user_item" to={`/${data.username}`} >
            <Image src={data.avatar || ImageNotFound } />
            <div>
                <p>{data.title}</p>
                <p>{data.username}</p>
            </div>
        </Link>
    )
}