import styled from "styled-components";
import IconButton from "@/components/Atoms/IconButton";
import Typography from "@/components/Atoms/Text";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ItemsSlider from "@/components/Organisms/ItemsSlider";
import TreatsSlider from "../TreatsSlider";

const UserInterfaceDiv = styled.div`
position:fixed;
width:100vw;
height:100vh;
padding:2.5em;
pointer-events:none;
display:flex;
flex-direction:column;
justify-content:space-between;
z-index:44;
`
const TopIcons = styled.div`
display:flex;
align-items:flex-end;
pointer-events:auto;
justify-content:space-between;

`
const BottomIcons = styled.div`
display:flex;
align-items:flex-end;
bottom:0;
gap:2em;
`
const ColIcon = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
text-align:${props => props.textAlign || "center"};
cursor:pointer;
pointer-events:auto;
`
const RowIcon = styled.div`
pointer-events:auto;
display:flex;
gap:${props => props.gap || ".5em"};
cursor:pointer;
`
const WeatherRow = styled(RowIcon)`
background-color:var(--primary);
padding:0em 1.5em;
gap:3em;
border-radius:1.5em;
`

const SliderIcons = styled(motion.div)`
position:absolute;
`
const WeatherDiv = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
gap:.5em;
text-align:center;
`
export default function UserInterface({
   weatherData,
   currentUser,
   onCatDexClick = () => { },
}) {
   const [cookShow, setCookShow] = useState(false);
   const [expanded, setExpanded] = useState(false);
   const [setItems, setItemsShow] = useState(false);
   const [treats, setTreatsShow] = useState(false);
   return (
      <UserInterfaceDiv>
         <TopIcons>
            <RowIcon>
               <IconButton image={"/cats/caticon.svg"} alt="Profile Icon" />
               <Typography
                  text={currentUser.displayName}
                  weight={"600"}
                  size={"1.2em"}
               />
            </RowIcon>
            {weatherData && <WeatherRow>
               <IconButton image={"/cats/caticon.svg"} alt="Weather Icon" />
               <WeatherDiv>
                  <Typography
                     text={weatherData.weather[0].main}
                     weight={"600"}
                     size={"1.2em"}
                  />
                  <Typography
                     text={`${weatherData.main.temp} ℃`}
                     size={"1.8rem"}
                     color={"var(--border-hard)"}
                     weight={"600"}
                  />
               </WeatherDiv>
            </WeatherRow>
            }

         </TopIcons>
         <BottomIcons>
            <ColIcon onClick={onCatDexClick}>
               <IconButton image={"/cats/caticon.svg"} alt="CatDex Button" />
               <Typography
                  text={"cat dex"}
                  weight={"600"}
                  size={"1.2em"}
               />
            </ColIcon>
            <ColIcon onClick={() => { setItemsShow(true) }}>
               <IconButton image={"/cats/caticon.svg"} alt="Items Button" />
               <Typography
                  text={"items"}
                  weight={"600"}
                  size={"1.2em"}
               />
            </ColIcon>
            <ItemsSlider active={setItems}
               onExit={() => { setItemsShow(false) }} />

            <ColIcon>
               <AnimatePresence>
                  {expanded &&
                     <SliderIcons
                        initial={{ opacity: 0, y: 100, x: "-25%" }}
                        animate={{ opacity: 1, y: -125 }}
                        exit={{ opacity: 0, y: 125 }}
                        transition={{ duration: .25 }}
                     >
                        <RowIcon gap={"2em"}>
                           <ColIcon>
                              <IconButton image={"/cats/caticon.svg"} alt="Cooking Button" onClick={() => { setTreatsShow(true) }} />
                              <Typography
                                 text={"place"}
                                 weight={"600"}
                                 size={"1.2em"}
                              />
                           </ColIcon>
                           <ColIcon>
                              <IconButton image={"/cats/caticon.svg"} alt="Cooking Button" onClick={() => { setCookShow(true) }} />
                              <Typography
                                 text={"cook"}
                                 weight={"600"}
                                 size={"1.2em"}
                              />
                           </ColIcon>
                        </RowIcon>
                     </SliderIcons>
                  }
               </AnimatePresence>
               <ColIcon onClick={() => { setExpanded(!expanded) }}>
                  <IconButton image={"/cats/caticon.svg"} alt="Treats Button" />
                  <Typography
                     text={"treats"}
                     weight={"600"}
                     size={"1.2em"}
                  />
               </ColIcon>
            </ColIcon>
            <TreatsSlider active={treats}
               onExit={() => { setTreatsShow(false) }} />


         </BottomIcons>
      </UserInterfaceDiv>
   )
}