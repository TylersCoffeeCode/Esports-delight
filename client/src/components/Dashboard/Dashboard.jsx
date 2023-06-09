import { useEffect, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import Client from "../../services/api"

const Dashboard = () => {

    const [tournaments, setTournaments] = useState(null)
    const [singleTournament, setSingleTournament] = useState(null)
    const [articles, setArticles] = useState(null)
    const [singleArticle, setSingleArticle] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const [selectedTournament, setSelectedTournament] = useState(null)
    const [selectedTab, setSelectedTab] = useState(1)



    const getTournaments = async () => {
        const res = await Client.get('/tournaments/')
        setTournaments(res.data)
    }

    const grabTournamentOne = async () => {
        const res = await Client.get('/tournaments/')
        setSingleTournament(res.data[0])
    }

    const grabArticleOne = async () => {
        const res = await Client.get('/articles')
        setSingleArticle(res.data[0])
    }

    const grabArticles = async () => {
        const res = await Client.get('/articles')
        setArticles(res.data)
    }





    useEffect(() => {
        getTournaments()
        grabTournamentOne()
        grabArticleOne()
        grabArticles()
    }, [])

    console.log(singleArticle);



    return (
        <div className=" bg-[#0B0C13] w-full h-[155vh] flex flex-wrap justify-center items-start content-start">
            <div className="w-[97%] h-[80vh] mt-[5rem] flex flex-wrap justify-center md:justify-start md:content-start">
                <div className=" w-full border-b-2 flex justify-between items-center">
                    <h2 className="text-white font-bold text-xl">News</h2>
                    <Link to='/allNews'><h2 className="text-blue-300 font-bold text-l">View All →</h2></Link>
                </div>
                {singleArticle && (<Link to={`/article/${singleArticle.id}`} className=" mt-4 flex w-[97%] h-1/4 flex-wrap sm:h-1/2 md:w-2/5 md:h-3/4 md:mr-2 md:mt-4">
                    <div className=" h-full w-full flex flex-wrap rounded-md items-end border-2 border-white"
                        style={{
                            backgroundImage: `url(${singleArticle.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                        <div className=" bg-black h-1/3 w-full rounded-md sm:h-1/4 md:h-1/5">
                            <h1 className="text-white ml-2">{singleArticle.title}</h1>
                        </div>
                    </div>
                </Link>
                )}
                <div className="flex flex-wrap flex-col h-2/4 w-[90%] overflow-x-scroll sm:h-1/3 md:flex-row md:h-3/4 md:w-[58%] md:justify-between md:mt-4 md:overflow-x-visible  md:content-between">
                    {articles && articles.slice(1, 5).map((article) => (
                        <Link to={`/article/${article.id}`} className="w-[65vw] h-full flex items-end mr-2 md:w-[48%] md:h-[48%]">
                            <div className=" w-full h-full rounded-md flex items-end"
                                style={{
                                    backgroundImage: `url(${article.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}>
                                <div className=" h-1/5 w-full bg-[rgba(0,0,0,0.8)] rounded">
                                    <h2 className="text-white pl-2">{article.title}</h2>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className=" w-[97%] h-[65vh]">
                <div className=" w-full border-b-2 pb-2 flex justify-between items-center">
                    <h2 className="text-white font-bold text-xl">Tournaments</h2>
                    <Link to='/allTournaments'><h2 className="text-blue-300 font-bold text-l">View All →</h2></Link>
                </div>
                <div className=" w-[97%] h-1/2 mt-4 border-2 flex flex-wrap justify-center cursor-pointer mb-6">
                    {singleTournament && <Link to={`/TournamentDetails/${singleTournament.id}`} className="w-full h-full">
                        <div className=" w-full h-full flex flex-wrap bg-[rgba(0,0,0,0.7)]">
                            <div className=" w-2/4 bg-[#0000007c] flex flex-wrap items-center">
                                <h2 className=" w-full text-center text-white text-2xl">{singleTournament.title}</h2>
                                <h4 className=" w-full text-center text-white">{singleTournament.date}</h4>
                            </div>
                            <div className=" w-2/4 " style={{
                                backgroundImage: `url(${singleTournament.gameImg})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'top',
                            }}>
                            </div>
                        </div>
                    </Link>
                    }

                </div>
                <div className="w-[95%] h-1/3 mt-2 flex flex-wrap flex-col overflow-x-scroll">
                    {tournaments && tournaments.slice(1).map((tournament) => (
                        <Link to={`/TournamentDetails/${tournament.id}`} className="flex flex-wrap w-1/3 h-full mr-6">
                            <div className={'flex flex-wrap w-full h-full border-2 border-white cursor-pointer'}
                                style={{ backgroundImage: `url(${tournament.gameImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                <div className="w-full flex flex-wrap justify-center bg-[rgba(0,0,0,0.7)] items-center">
                                    <h1 className="w-full text-center text-white">{tournament.title}</h1>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Dashboard


// return (
//     <div className=" bg-[#0B0C13] w-full h-[100vh] flex flex-wrap items-start">
//         <div className="w-11/12 h-[40%] ml-8 mt-[5rem] flex flex-wrap">
//             <div className=" w-full border-b-2 pb-2 flex justify-between items-center">
//                 <h2 className="text-white font-bold text-xl">News</h2>
//                 <Link to='/allNews'><h2 className="text-blue-300 font-bold text-l">View All →</h2></Link>
//             </div>
//             {singleArticle && (<Link to={`/article/${singleArticle.id}`} className="flex flex-wrap w-5/12 h-5/6">
//                 <div className="flex w-full h-full mt-4 rounded items-end"
//                     style={{
//                         backgroundImage: `url(${singleArticle.image})`,
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center'
//                     }}>
//                     <div className=" w-full h-1/4 bg-[rgba(0,0,0,0.8)] rounded">
//                         <h1 className="text-white pl-2 mb-4">{singleArticle.title}</h1>
//                         <p className=" text-blue-300 float-right mr-2">Read More →</p>
//                     </div>
//                 </div>
//             </Link>
//             )}
//             <div className="flex flex-wrap w-[58%] mt-4 h-5/6 justify-around content-between">
//                 {articles && articles.slice(1, 5).map((article) => (
//                     <Link to={`/article/${article.id}`} className="w-[47%] h-[48.5%] flex items-end">
//                         <div className=" w-full h-full rounded-md flex items-end"
//                             style={{
//                                 backgroundImage: `url(${article.image})`,
//                                 backgroundSize: 'cover',
//                                 backgroundPosition: 'center'
//                             }}>
//                             <div className=" h-1/3 w-full bg-[rgba(0,0,0,0.8)] rounded">
//                                 <h2 className="text-white pl-2">{article.title}</h2>
//                                 <p className=" text-blue-300 float-right mr-2">Read More →</p>
//                             </div>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//         <div className=" w-11/12 h-[50%]  ml-8">
//             <div className=" w-full border-b-2 pb-2 flex justify-between items-center">
//                 <h2 className="text-white font-bold text-xl">Tournaments</h2>
//                 <Link to='/allTournaments'><h2 className="text-blue-300 font-bold text-l">View All →</h2></Link>
//             </div>
//             <div className=" w-[95%] h-1/2 mt-4 border-2 flex flex-wrap justify-center cursor-pointer">
//                 {singleTournament && <Link to={`/TournamentDetails/${singleTournament.id}`} className="w-full h-full">
//                     <div className=" w-full h-full flex flex-wrap bg-[rgba(0,0,0,0.7)]">
//                         <div className=" w-2/4 bg-[#0000007c] flex flex-wrap items-center">
//                             <h2 className=" w-full text-center text-white text-2xl">{singleTournament.title}</h2>
//                             <h4 className=" w-full text-center text-white">{singleTournament.date}</h4>
//                         </div>
//                         <div className=" w-2/4 " style={{
//                             backgroundImage: `url(${singleTournament.gameImg})`,
//                             backgroundSize: 'cover',
//                             backgroundPosition: 'top',
//                         }}>
//                         </div>
//                     </div>
//                 </Link>
//                 }

//             </div>
//             <div className="w-[95%] h-1/3 mt-2 flex flex-wrap flex-col overflow-x-scroll">
//                 {tournaments && tournaments.slice(1).map((tournament) => (
//                     <Link to={`/TournamentDetails/${tournament.id}`} className="flex flex-wrap w-64 h-full mr-6">
//                         <div className={'flex flex-wrap w-full h-full border-2 border-white cursor-pointer'}
//                             style={{ backgroundImage: `url(${tournament.gameImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//                             <div className="w-full flex flex-wrap justify-center bg-[rgba(0,0,0,0.7)] items-center">
//                                 <h1 className="w-full text-center text-white">{tournament.title}</h1>
//                             </div>
//                         </div>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     </div>
// )