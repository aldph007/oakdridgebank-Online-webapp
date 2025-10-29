
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DollarSign, Trash2, PlusCircle, MoreHorizontal, Wifi } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const cards = [
    {
        id: 'card-1',
        bankName: 'OAKridgebank',
        cardNumber: '4085 **** **** 6829',
        cardHolder: 'Joseph H. Phillips',
        expires: '12/26',
        balance: '256,907.35',
        bgColor: 'bg-gradient-to-br from-primary to-[#10164e]',
        textColor: 'text-primary-foreground',
        logo: (
             <svg width="40" height="40" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a-b">
                  <stop stopColor="#F79E1B" offset="0%"/>
                  <stop stopColor="#F58524" offset="100%"/>
                </linearGradient>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a-c">
                  <stop stopColor="#FF5F00" offset="0%"/>
                  <stop stopColor="#F58524" offset="100%"/>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <circle fill="#EA001B" cx="10" cy="10" r="10"/>
                <circle fill="url(#a-b)" cx="22" cy="10" r="10"/>
                <path d="M16 10a10 10 0 0 1-2.922-6.993A10 10 0 0 0 10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10a10 10 0 0 0 3.007-.488A10 10 0 0 1 16 10z" fill="url(#a-c)"/>
              </g>
            </svg>
        )
    },
    {
        id: 'card-2',
        bankName: 'OAKridgebank',
        cardNumber: '5594 **** **** 6829',
        cardHolder: 'Joseph H. Phillips',
        expires: '08/25',
        balance: '95,701.17',
        bgColor: 'bg-gradient-to-br from-neutral-800 to-black',
        textColor: 'text-neutral-200',
        logo: (
            <svg width="40" height="40" viewBox="0 0 32 20" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b-b">
                  <stop stopColor="#F79E1B" offset="0%"/>
                  <stop stopColor="#F58524" offset="100%"/>
                </linearGradient>
                <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b-c">
                  <stop stopColor="#FF5F00" offset="0%"/>
                  <stop stopColor="#F58524" offset="100%"/>
                </linearGradient>
              </defs>
              <g fill="none" fillRule="evenodd">
                <circle fill="#EA001B" cx="10" cy="10" r="10"/>
                <circle fill="url(#b-b)" cx="22" cy="10" r="10"/>
                <path d="M16 10a10 10 0 0 1-2.922-6.993A10 10 0 0 0 10 0c-5.523 0-10 4.477-10 10s4.477 10 10 10a10 10 0 0 0 3.007-.488A10 10 0 0 1 16 10z" fill="url(#b-c)"/>
              </g>
            </svg>
        )
    }
]

export default function CardsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-headline">My Cards</h1>
                    <p className="text-muted-foreground">
                        Manage your physical and virtual cards.
                    </p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Card
                </Button>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {cards.map((card) => (
                    <Card key={card.id} className="flex flex-col justify-between overflow-hidden shadow-lg">
                        <div className={`relative rounded-t-lg ${card.bgColor} ${card.textColor} p-6`}>
                            <div className="flex justify-between items-start">
                                <span className="font-semibold">{card.bankName}</span>
                                <Wifi className="h-5 w-5" />
                            </div>
                            <div className="pt-8 pb-4">
                                <p className="text-xl md:text-2xl font-mono tracking-wider">{card.cardNumber}</p>
                            </div>
                            <div className="flex justify-between items-end text-sm">
                                <div>
                                    <p className="text-xs opacity-70">CARD HOLDER</p>
                                    <p className="font-medium">{card.cardHolder}</p>
                                </div>
                                <div>
                                    <p className="text-xs opacity-70 text-right">EXPIRES</p>
                                    <p className="font-medium">{card.expires}</p>
                                </div>
                                <div className="absolute right-6 bottom-6 opacity-80">{card.logo}</div>
                            </div>
                        </div>
                        <CardContent className="p-6 flex-1">
                           <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-muted-foreground">Balance</p>
                                    <p className="text-2xl font-bold font-headline">${card.balance}</p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-5 w-5" />
                                </Button>
                           </div>
                        </CardContent>
                        <Separator />
                        <CardFooter className="p-4 bg-muted/50 grid grid-cols-2 gap-2">
                           <Button variant="outline" size="sm">
                                <DollarSign className="mr-2 h-4 w-4"/>
                                Fund
                            </Button>
                            <Button variant="destructive" size="sm">
                                <Trash2 className="mr-2 h-4 w-4"/>
                                Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
