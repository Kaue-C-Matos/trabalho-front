import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Container, Flex, Grid, Img, Text } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CharacterList = () => {
    const [hoveredItem, setHoveredItem] = useState(-1)
    const [characterData, setCharacterData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    
    const navigate = useNavigate()
    
    const itemsPerPage = 8;

    const callImage = (character) =>{
        return(
            `https://jojos-bizarre-api.netlify.app/assets/${character.image}`
        )
    }

    const fetchCharacterData = useCallback(async ()=>{
        try {
            const {data} = await axios.get('https://stand-by-me.herokuapp.com/api/v1/characters')
            setCharacterData(data)
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(()=>{
        fetchCharacterData()
    }, [])

    const handleClick = (character) =>{
        navigate(`/${character.name}`)
    }

    const renderCharacterData = () =>{
        const startIndex = (currentPage -1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage

        const charactersToShow = characterData.slice(startIndex, endIndex)

        return(
            <div>
                <Flex>
                    <Breadcrumb>
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href="/" color="white" marginRight="375px" fontWeight="bold">Home</BreadcrumbLink>
                        </BreadcrumbItem> 
                    </Breadcrumb>
                    <Img width="350px" src="https://logos-world.net/wp-content/uploads/2022/01/Jojos-Bizarre-Adventure-anime-Logo-2012-700x394.png" alt="jojo logo"/>
                </Flex>
                <Text fontSize='30px' color="white">Personagens: </Text>
                <Grid templateColumns='repeat(4, 1fr)' gap={100} margin="0px 100px">
                    {charactersToShow.map((character, index)=>(
                        <Container 
                            bgColor="violet" 
                            borderRadius="20px" 
                            onClick={()=>handleClick(character)} 
                            height="340px"
                            style={{boxShadow: index === hoveredItem? '0 0 10px goldenrod' : 'none'}}
                            onMouseEnter={()=>setHoveredItem(index)}
                            onMouseLeave={()=>setHoveredItem(-1)}
                        >
                            <Img src={callImage(character)} alt={character.name} boxSize="200px" objectFit="contain"/>
                            <Text fontSize="20px" fontWeight="bold">{character.name}</Text>
                            <Text fontSize="15px">{character.chapter}</Text>
                        </Container>
                    ))}
                </Grid>
            </div>
        )
    }

    const totalPages = Math.ceil(characterData.length / itemsPerPage)

    const handlePreviousPage = () =>{
        if (currentPage === 1){
            setCurrentPage(1)
        } else{
            setCurrentPage((prevPage) =>  prevPage-1)

        }
    }

    const handleNextPage = () =>{
        if(currentPage === 22){
            setCurrentPage(22)
        } else{
            setCurrentPage((prevPage) =>prevPage+1)
        }
    }

    const renderPagination = () =>{
        return(
            <Flex justifyContent="center" marginTop="20px">
                <Button onClick={handlePreviousPage} disabled={currentPage === 1} marginRight="10px" borderRadius="20px" bgColor="goldenrod">
                    Anterior
                </Button>
                <Text color="white" fontWeight="bold">{`Página ${currentPage} de ${totalPages}`}</Text>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages} marginLeft="10px" borderRadius="20px" bgColor="goldenrod">
                    Próxima
                </Button>
            </Flex>
        )
    }
    
    return (
        <div>
            <Container bgColor="purple">
                {renderCharacterData()}
                {renderPagination()}
            </Container>
        </div>
    );
}

export default CharacterList;