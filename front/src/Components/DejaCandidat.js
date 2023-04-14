import { useNavigate } from "react-router-dom"

const DejaCandidat = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
            <h1>Ati devenit candidat! Mult succes!</h1>
            <br />
            
        </section>
    )
}

export default DejaCandidat