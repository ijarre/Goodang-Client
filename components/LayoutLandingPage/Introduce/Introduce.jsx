import React from "react"

const Introduce = () => {
    return (

        <div id="Intro">

            <div className="lg:w-5/12 mx-auto px-2 mt-32 mb-14">
                <h2 className="text-center text-4xl font-bold tracking-wider transform hover:scale-110">
                    INTODUCE
                </h2>
            </div>

            <div className="container item-center grid grid-row-3 lg:grid-row-3 max-w-screen-lg mt-16">
                <div className="flex flex-col rounded-md shadow-md lg:mb-16 bg-white">
                    <div className="pt-6 flex flex-col items-center">

                        <div className="p-2 mb-1 flex flex-col items-center">
                            <ul>
                                <li className="list-none">
                                    <div className="font-bold text-lg tracking-wide text-center">
                                        Asset Registration
                                    </div>
                                </li>
                                <li className="list-none">
                                    <div className="m-2 text-lg flex text-center">
                                        The list of fixed assets is nothing more than the list of fixed assets belonging to the entity.<br />
                                        Traditionally, fixed asset registers are maintained in written form by bookkeepers using books set aside specifically for that purpose.<br />
                                    </div>
                                </li>
                            </ul>
                            <div className="flex p-2 text-center">
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col rounded-lg shadow-md lg:mb-16 bg-white">
                    <div className="pt-6 flex flex-col items-center">
                        <div className="p-4 mb-2 flex flex-col items-center">
                            <ul>
                                <li className="list-none">
                                    <div className="font-bold text-lg tracking-wide text-center mt-3">
                                        Quantity Check
                                    </div>
                                </li>

                                <li className="list-none">
                                    <div className="m-2 text-lg flex text-center">
                                        Procurement is any activity that aims to provide office equipment needs to support the implementation of office work. Procurement is carried out in various ways in accordance with company policies and the needs of each company.
                                    </div>
                                </li>
                            </ul>
                            <div className="flex text-center p-2">
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col rounded-lg shadow-md  lg:mb-16 bg-white">
                    <div className="pt-6 flex flex-col items-center">
                        <div className="p-4 flex flex-col items-center">
                            <ul>
                                <li className="list-none">
                                    <div className="font-bold text-lg tracking-wide text-center">
                                        Insightful Dashboard
                                    </div>
                                </li>
                                <li className="list-none">
                                    <div className="m-2 text-lg flex text-center">
                                        The Transaction History page allows you to view information about incoming stock, outgoing stock, as well as edit ongoing transactions internally for your account or for the clients or sub accounts you manage.
                                    </div>
                                </li>
                            </ul>
                            <div className="flex p-2 text-center">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Introduce;