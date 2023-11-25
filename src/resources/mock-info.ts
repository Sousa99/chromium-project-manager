import { IData } from "@models/data/IData";
import { ITicketType } from "@models/ticket/ITicketType";

export const mock_info: IData = [
    {
        main_project: true,
        code: 'OSANA',
        name: 'OneShop AI',
        hidden: false,
        tickets: [
            {
                code: 'OSANA-0001',
                name: 'Mock ticket to test functionality',
                type: ITicketType.Feature,
                hidden: false,
                url: 'https://puginarug.com/',
                links: [
                    {
                        tooltip: 'Branch',
                        url: 'https://github.com/'
                    },
                    {
                        tooltip: 'PR',
                        url: 'https://css-tricks.com/'
                    },
                    {
                        tooltip: 'Something',
                        url: 'https://github.com/Sousa99/DMEIC-2122'
                    }
                ]
            },
            {
                code: 'OSANA-0002',
                name: 'Mock ticket to test functionality 2',
                hidden: true,
                type: ITicketType.Feature,
                links: []
            }
        ]
    },
    {
        main_project: false,
        code: 'OM',
        name: 'Orange-Media',
        hidden: false,
        tickets: [
            {
                code: 'ALL-BE-0001',
                name: 'Mock ticket to test functionality 2.1',
                type: ITicketType.Feature,
                hidden: true,
                url: 'https://puginarug.com/',
                links: [
                    {
                        tooltip: 'Branch',
                        url: 'https://github.com/'
                    },
                    {
                        tooltip: 'PR',
                        url: 'https://css-tricks.com/'
                    },
                    {
                        tooltip: 'Something',
                        url: 'https://github.com/Sousa99/DMEIC-2122'
                    }
                ]
            },
        ]
    },
]