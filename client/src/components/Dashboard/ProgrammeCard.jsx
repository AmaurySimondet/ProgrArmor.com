import { React, useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import API from '../../utils/API';
import { Scrollbars } from 'react-custom-scrollbars';

function ProgrammeCard(props) {
    const [programme, setProgramme] = useState(props.programme);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });
    const [isFlipped, setIsFlipped] = useState(false);
    const [liked, setLiked] = useState(false);
    const [commented, setCommented] = useState(false);
    const [likes, setLikes] = useState(0);
    const [flipWhoLiked, setFlipWhoLiked] = useState(false);
    const [whoLikedArray, setWhoLikedArray] = useState([]);
    const [programmeCreator, setProgrammeCreator] = useState({});
    const [mouseEnter, setMouseEnter] = useState(false);
    const [flipComment, setFlipComment] = useState(false);
    const [whoCommentedArray, setWhoCommentedArray] = useState([]);
    const [comment, setComment] = useState('');

    function handleFlip() {
        setIsFlipped(!isFlipped);
    }

    function handleFlipWhoLiked() {
        setIsFlipped(false);
        setFlipWhoLiked(false)
    }

    function handleMouseEnter() {
        setMouseEnter(true);
    }

    function handleMouseLeave() {
        setMouseEnter(false);
    }

    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }

        var timeout = false;
        window.addEventListener('resize', function () {
            clearTimeout(timeout);;
            timeout = setTimeout(handleResize, 200);
        });
    });

    async function handleLike() {
        const { data } = await API.likeProgramme({ programmeId: programme._id, userId: localStorage.getItem('id') });
        if (data.success) {
            window.location.reload();
        }
        else {
            alert(data.message);
        }
    }

    async function handleComment() {
        const { data } = await API.CommentProgramme({ programmeId: programme._id, userId: localStorage.getItem('id') });
        if (data.success) {
            window.location.reload();
        }
        else {
            alert(data.message);
        }
    }

    async function handleLiked() {
        const { data } = await API.isProgrammeLiked({ programmeId: programme._id, userId: localStorage.getItem('id') });
        if (data.success) {
            setLiked(data.liked);
        }
        else {
            alert(data.message);
        }
    }

    async function handleCommented() {
        const { data } = await API.isProgrammeCommented({ programmeId: programme._id, userId: localStorage.getItem('id') });
        if (data.success) {
            setCommented(data.commented);
        }
        else {
            alert(data.message);
        }
    }


    async function getLikes() {
        const { data } = await API.getProgrammeLikes({ programmeId: programme._id });
        if (data.success) {
            setLikes(data.likes);
        }
        else {
            alert(data.message);
        }
    }

    async function whoLiked() {
        const { data } = await API.whoLiked({ programmeId: programme._id });
        if (data.success) {
            setWhoLikedArray(data.whoLiked);
            setIsFlipped(true);
            setFlipWhoLiked(true);
        }
        else {
            alert(data.message);
        }
    }

    async function getProgrammeCreator() {
        const { data } = await API.getProgrammeCreator({ programmeId: programme._id });
        if (data.success) {
            console.log(data.creator)
            setProgrammeCreator(data.creator);
        }
        else {
            alert(data.message);
        }
    }

    async function sendComment() {
        const { data } = await API.sendComment({ programmeId: programme._id, userId: localStorage.getItem('id'), comment: comment });
        if (data.success) {
            window.location.reload();
        }
        else {
            alert(data.message);
        }
    }

    async function getComments() {
        const { data } = await API.getComments({ programmeId: programme._id });
        if (data.success) {
            setWhoCommentedArray(data.comments)
        }
        else {
            alert(data.message);
        }
    }


    function handleFlipCommentTrue() {
        setIsFlipped(true);
        setFlipComment(true);
    }

    function handleFlipCommentFalse() {
        setIsFlipped(false);
        setFlipComment(false);
    }

    useEffect(() => {
        handleLiked();
        handleCommented();
        getLikes();
        getProgrammeCreator();
        getComments();
    }, []);

    return (
        <div className="react-card">

            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div className="YOUR_FRONT_CCOMPONENT">

                    <div className="programme-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                        <Scrollbars autoHide>
                            <div className="programme-card-header">

                                <div onClick={handleFlip} style={dimensions.width > 850 ? { marginBottom: "40px" } : { marginBottom: "10px" }}>
                                    <h1 style={{ marginBottom: "1rem", marginTop: "20px" }}>{programme.titre ? programme.titre : "Programme sans titre"} </h1>
                                    <p>{programme.description ? programme.description : "/"} </p>
                                    <p> <i>{programme._id}</i> </p>
                                </div>

                                <div onClick={handleFlip} style={dimensions.width > 850 ? { marginBottom: "40px" } : { marginBottom: "10px" }}>
                                    <p>{programme.type}</p>
                                    <p>{programme.niveau}</p>
                                    <p>{programme.seancesSemaine}</p>
                                    <p>{programme.duree}</p>
                                    {programme.materiel.map((materiel, index) => {
                                        if (index <= 3) {
                                            return <p style={{ overflow: "hidden", margin: "0" }}>{materiel.slice(0, 40)}</p>
                                        }
                                        if (index === 4) {
                                            return <p style={{ overflow: "hidden", margin: "0" }}>...</p>
                                        }
                                    }
                                    )}
                                </div>

                                <i onClick={handleFlip} style={{ fontSize: "10px" }}>
                                    Cliquez sur le programme pour en savoir plus
                                </i>

                            </div>

                            <div className={mouseEnter ? "programme-card-profile-hover" : "programme-card-profile"}>
                                <table className="basic-table">
                                    <col style={{ width: "35%" }} />
                                    <col style={{ width: "65%" }} />
                                    <tr>
                                        <td>
                                            <img
                                                className="profile-pic"
                                                src={programmeCreator.profilePic}
                                                alt="profile-pic"
                                            />
                                        </td>
                                        <td>
                                            <p style={{ margin: "auto", display: "inline-block" }}>{programmeCreator.fName} {programmeCreator.lName}</p>
                                            <br />
                                            <p style={{ margin: "auto", display: "inline-block" }}>{programmeCreator._id}</p>
                                        </td>
                                    </tr>
                                </table>


                                <table className="basic-table">
                                    <tr>
                                        <td>
                                            {liked ?
                                                <img
                                                    className="small-img"
                                                    src={require('../../images/icons/like-red.png')}
                                                    onClick={handleLike}
                                                    alt='liked' />
                                                :
                                                <img
                                                    className="small-img"
                                                    src={require('../../images/icons/like.png')}
                                                    onClick={handleLike}
                                                    alt='like' />
                                            }
                                        </td>
                                        <td>
                                            <p style={{ margin: "auto" }} className="hover-text" onClick={whoLiked}> {likes} </p>
                                        </td>
                                        <td>
                                            {commented ?
                                                <img className="small-img" src={require('../../images/icons/comment-red.png')} onClick={handleFlipCommentTrue} alt='comment' />
                                                :
                                                <img className="small-img" src={require('../../images/icons/comment.png')} onClick={handleFlipCommentTrue} alt='comment' />
                                            }
                                        </td>
                                        <td>
                                            <p style={{ margin: "auto" }} className="hover-text" onClick={handleFlipCommentTrue}> {whoCommentedArray.length} </p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </Scrollbars>
                    </div >

                </div>


                <div className="YOUR_BACK_COMPONENT">
                    {flipWhoLiked ?
                        <div className="programme-card" onClick={handleFlipWhoLiked}>
                            {whoLikedArray.length > 0 ?
                                whoLikedArray.map((user, index) => {
                                    return (
                                        <table className="basic-table" style={index === 0 ? { marginTop: "20px" } : null}>
                                            <col style={{ width: "20%" }} />
                                            <col style={{ width: "80%" }} />
                                            <tr>
                                                <td>
                                                    <img
                                                        className="profile-pic"
                                                        src={user.user.profilePic}
                                                        alt="profile-pic"
                                                    />
                                                </td>
                                                <td>
                                                    <p style={{ margin: "auto", display: "inline-block" }}>{user.user.fName} {user.user.lName}</p>
                                                </td>
                                            </tr>
                                        </table>)
                                })
                                :
                                <div style={{ marginTop: "40px" }}>
                                    <p>Personne n'a aimé ce programme...</p>
                                    <p>Alors attention j'ai pas dis qu'il était nul hein juste que personne l'a liké voilà ça arrive</p>
                                    <p>De toute façon je vois pas pourquoi je devrais avoir à me justifier</p>
                                </div>}
                        </div>
                        :
                        null
                    }

                    {flipComment ?
                        <div className="programme-card">
                            <Scrollbars autoHide>
                                <div style={{ overflow: "auto" }} onClick={handleFlipCommentFalse}>
                                    {whoCommentedArray.length > 0 ?
                                        whoCommentedArray.map((comment, index) => {
                                            return (
                                                <table className="comment-table" style={index === 0 ? { marginTop: "20px" } : null}>
                                                    <col style={{ width: "20%" }} />
                                                    <col style={{ width: "80%" }} />
                                                    <tr>
                                                        <td>
                                                            <img
                                                                className="profile-pic profile-pic-comment"
                                                                src={comment.user.profilePic}
                                                                alt="profile-pic"
                                                            />
                                                        </td>
                                                        <td>
                                                            <div style={{ padding: "5%" }}>
                                                                <p style={{ margin: "auto", display: "inline-block", fontSize: "7px" }}>{comment.user.fName} {comment.user.lName}</p>
                                                                <br />
                                                                <p style={{ margin: "auto", display: "inline-block" }}>{comment.comment}</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>)
                                        })
                                        :
                                        <div>
                                            <button onClick={handleFlipCommentFalse} className="btn btn-dark large-margin-updown">
                                                Retour au programme
                                            </button>
                                            <p> Tu seras le premier à commenter, c'est un privilège </p>
                                        </div>}
                                </div>


                                <div className='form-group row'>
                                    <input type='text' className='form-control col-10 comment'
                                        placeholder="Même ma grand-mère peut le faire"
                                        onChange={e => setComment(e.target.value)}
                                    />
                                    <img
                                        className="small-img col-2"
                                        src={require('../../images/icons/send-comment.png')}
                                        alt='send'
                                        onClick={sendComment} />
                                </div>
                            </Scrollbars>
                        </div>
                        : null
                    }

                </div>
            </ReactCardFlip>

        </div>
    )
};

export default ProgrammeCard;