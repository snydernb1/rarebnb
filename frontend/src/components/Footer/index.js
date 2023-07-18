import './Footer.css'


export default function Footer () {

    return (
        <section className="footerContainer">

            <div className="footerDiv">
                <p className='footerBotBold'>2023 Rarebnb</p>
                <a href='https://expressjs.com/' target='_blank' className='techLinks'>Express</a>
                <a href='https://sequelize.org/' target='_blank' className='techLinks'>Sequelize</a>
                <a href='https://www.postgresql.org/' target='_blank' className='techLinks'>PostgreSQL</a>


                <a href='https://www.javascript.com/' target='_blank' className='techLinks'>JavaScript</a>
                <a href='https://react.dev/' target='_blank' className='techLinks'>React</a>
                <a href='https://redux.js.org/' target='_blank' className='techLinks'>Redux</a>
                <a href='https://www.w3.org/Style/CSS/Overview.en.html' target='_blank' className='techLinks'>CSS</a>
            </div>


            <div className="footerDiv">
                <i class="fas fa-globe"></i>
                <p>English (US)</p>
                <p>$ USD</p>

                <a href='https://github.com/snydernb1' target='_blank' className="techLinks" id='githibLink'>
                    <i class="fa-brands fa-github"></i>
                </a>

                <a href='https://www.linkedin.com/in/nicholas-snyder-2714a5a1/' target='_blank' className="techLinks" id='githibLink'>
                    <i class="fa-brands fa-linkedin"></i>
                </a>

            </div>

        </section>
    );
};
