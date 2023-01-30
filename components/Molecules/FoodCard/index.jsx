import styled from "styled-components";
import Typography from "@/components/Atoms/Text";
import Image from "next/image";
import TreatsData from "@/data/treats.json"

const FoodCardDiv = styled.div`
    background-color:var(--white);
    padding:1em 1.5em 1em 1.5em;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius:1.2em;
    width:290px;
    min-height:420px;
    cursor:pointer;
    transition:all .1s ease-in-out;
    border: 3px solid var(--border-hard);
    box-shadow: 0px 6px 0px var(--border-hard);
    &:hover {
        background-color:var(--primary);
     }
`

const FoodCardHead = styled.div`
    position: relative;
    width: 275px;
    height: 65px;
    border-radius: 1.2em 1.2em 0px 0px;
    background-color: var(--accent);
    transform: translate(-0px,-10.5px);
    display: flex;
    justify-content: center;
    align-items: center;
    // margin-bottom: 20px;
`

const FoodTextDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`


const IngCont = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
`

const IngItem = styled.div`
    margin: 1em;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.5em;
`

export default function FoodCard(
    {
        treatname,
        aing,
        bing,
        treatimg,
        aimg,
        bimg
    }
){
    return(
        <FoodCardDiv>
            <FoodCardHead>
                <FoodTextDiv>
                    <Typography
                        treat={treatname}
                        weight={"500"}
                        size={"1.5em"}
                        color={"var(--secondary-accent)"}
                    />
                </FoodTextDiv>
            </FoodCardHead>

                <Image src={treatimg} width={200} height={200} alt="bento" />
                
                <IngCont>
                    <IngItem>
                        <Typography text={aing} weight={"400"} size={"1em"} />
                        <Image src={aimg} width={45} height={45} alt="bento" />
                    </IngItem>

                    <IngItem>
                        <Typography text={bing} weight={"400"} size={"1em"} />
                        <Image src={bimg} width={45} height={45} alt="bento" />
                    </IngItem>
                </IngCont>

        </FoodCardDiv>
    )
}