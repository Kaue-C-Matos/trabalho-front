import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Container, Flex, Image, Spacer, Text, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CharacterDetail = () => {
    const {selectedCharacter} = useParams()
    const [character, setCharacter] = useState([])

    const callImage = (character) =>{
        return(
            `https://jojos-bizarre-api.netlify.app/assets/${character.image}`
        )
    }

    const living = (character) =>{
        if (character.living === true) {
            return <Text><strong>Estado: </strong>Vivo</Text>
        } else {
            return <Text><strong>Estado: </strong>Morto</Text>
        }
    }

    const human = (character) =>{
        if (character.isHuman === true) {
            return <Text fontWeight="bold">Humano</Text>
        } else {
            return <Text fontWeight="bold">Não é humano</Text>
        }
    }
    
    const fetchCharacterData = useCallback(async ()=>{
        try {
            const {data} = await axios.get(`https://stand-by-me.herokuapp.com/api/v1/characters/query/query?name=${selectedCharacter}`)
            setCharacter(data)
        } catch (error) {
            console.error(error)
        }
    }, [selectedCharacter])

    useEffect(()=>{
        fetchCharacterData()
    }, [])

    const renderCharacterData = () =>{
        return(
            <div>
                <Flex>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink color="white" href="/" fontWeight="bold">Home</BreadcrumbLink>
                        </BreadcrumbItem> 
                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink color="white" href="/:selectedCharacter" fontWeight="bold">{selectedCharacter}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <Spacer/>
                    <Image marginRight="50px" width="350px" src="https://logos-world.net/wp-content/uploads/2022/01/Jojos-Bizarre-Adventure-anime-Logo-2012-700x394.png" alt="jojo logo"/>
                </Flex>
                {character.map((characterData)=>(
                    <div>
                        <Flex marginTop="20px" aria-label="A tooltip" >
                            <Tooltip hasArrow label={characterData.name} bg="gold" padding="2px" fontWeight="bold" borderRadius="5px">
                                <Image margin="35px 50px 125px 35px" maxH="600px" maxWidth="600px" src={callImage(characterData)} alt={character.name}/>
                            </Tooltip>
                            
                            <Container Height="500px" Width="600px" backgroundColor="purple" borderRadius="20px" fontSize="20px" color="white" padding="20px" margin=" 35px 70px">
                                <Text fontSize="40px">{characterData.name}/</Text>
                                <Text marginTop="-40" fontSize="40px">{characterData.japaneseName}</Text>
                                <Text><strong>Habilidades:</strong> {characterData.abilities}</Text>
                                <Text><strong>Nacionalidade:</strong> {characterData.nationality}</Text>
                                <Text><strong>Frase de efeito:</strong> {characterData.catchphrase}</Text>
                                <Text><strong>Familiares:</strong> {characterData.family}</Text>
                                <Text><strong>Capítulo(s):</strong> {characterData.chapter}</Text>
                                <Text>{living(characterData)}</Text>
                                <Text>{human(characterData)}</Text>
                            </Container>
                        </Flex>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            <Container bgColor="violet">
                {renderCharacterData()}

            </Container>
        </div>
    );
}

export default CharacterDetail;