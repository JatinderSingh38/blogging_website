import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const msg = useLocation();
    const [Cnt, usecount] = useState(0);
    function numinc() {
        usecount(Cnt + 1);
    }
    const numdec = () => {
        usecount(Cnt - 1);
    };
    const rst = () => {
        usecount(0);
    };
    // useEffect(() => {
    //     console.log('useEffect called')
    //     alert('useEffect called')
    // }, [Cnt]);

    const HandelNext = () => {
        console.log("button click")
        navigate("/Submit", {
            state: {
                name: "jatinder",
                age: Cnt
            }

        })
        localStorage.setItem("response", "demo")
        localStorage.setItem("resp", "dem")

    }

    return (
        <div className="App">
            <div className="empty"></div>
            <h1>welcome to home page</h1>
            <p>dDance is an art form, often classified as a sport, consisting of sequences of body movements with aesthetic and often symbolic value, either improvised or purposefully selected.[nb 1] Dance can be categorized and described by its choreography, by its repertoire of movements or by its historical period or place of origin.[3] Dance is typically performed with musical accompaniment, and sometimes with the dancer simultaneously using a musical instrument themselves.

                An important distinction is to be drawn between theatrical and participatory dance,[4] although these two categories are not always completely separate; both may have special functions, whether social, ceremonial, competitive, erotic, martial, sacred or liturgical. Other forms of human movement are sometimes said to have a dance-like quality, including martial arts, gymnastics, cheerleading, figure skating, synchronized swimming, marching bands, and many other forms of athletics. Dance is not solely restricted to performance, as dance is used as a form of exercise and occasionally training for other sports and activities. Dance has become a sport for some, with dancing competitions found across the world exhibiting various different styles and standards. Dance has an aesthetic appeal to many people.[5]

                Theatrical and participatory dance

                Members of an American jazz dance company perform a formal group routine in a concert dance setting

                This section does not cite any sources. Please help improve this section by adding citations to reliable sources. Unsourced material may be challenged and removed. (June 2023) (Learn how and when to remove this template message)
                Theatrical dance, also called performance or concert dance, is intended primarily as a spectacle, usually a performance upon a stage by virtuoso dancers. It often tells a story, perhaps using mime, costume and scenery, or it may interpret the musical accompaniment, which is often specially composed and performed in a theatre setting but it is not a requirement. Examples are Western ballet and modern dance, Classical Indian dance such as Bharatanatyam, and Chinese and Japanese song and dance dramas, such as the dragon dance. Most classical forms are centred upon dance alone, but performance dance may also appear in opera and other forms of musical theatre.

                Participatory dance, whether it be a folk dance, a social dance, a group dance such as a line, circle, chain or square dance, or a partner dance, such as in Western ballroom dancing, is undertaken primarily for a common purpose, such as social interaction or exercise, or building flexibility of participants rather than to serve any benefit to onlookers. Such dance seldom has any narrative. A group dance and a corps de ballet, a social partner dance and a pas de deux, differ profoundly. Even a solo dance or interpretive dance may be undertaken solely for the satisfaction of the dancer. Participatory dancers often all employ the same movements and steps but, for example, in the rave culture of electronic dance music, vast crowds may engage in free dance, uncoordinated with those around them. On the other hand, some cultures lay down strict rules as to the particular dances people may or must participate.

                History
                Main article: History of dance

                Mesolithic dancers at Bhimbetka
                Archaeological evon rather than for an audience, may include various forms of mime and narrative, but are typically set much more closely to the rhythmic pattern of music, so that terms like waltz and polka refer as much to musical pieces as to the dance itself. The rhythm of the dancers' feet may even form an essential part of the music, as in tap dance. African dance, for example, is rooted in fixed basic steps, but may also allow a high degree of rhythmic interpretation: the feet or the trunk mark the basic pulse while cross-rhythms are picked up by shoulders, knees, or head, with the best dancers simultaneously giving plastic expression to all the elements of the polyrhythmic pattern.[38]
            </p>
            <h1>push num:{Cnt}</h1>
            {/* <h1>from login: {msg.state && msg.state.name.isnav ? "t" : "fl"}</h1> */}
            {/* <h2>fromloginstringi:{JSON.stringify(msg.state.name.isNav)}</h2> */}
            <button onClick={numinc}>+</button>
            <button onClick={rst} className="btn">rst</button>
            <button onClick={numdec}>-</button>
            <div style={{ padding: "10px" }}><button onClick={HandelNext} className="btn"><h1>SUBMIT</h1></button></div>
        </div>

    )
}
export default Home