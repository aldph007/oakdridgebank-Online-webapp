
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
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
            <svg width="40" height="40" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-200">
                <rect x="0.5" y="0.5" width="37" height="23" rx="3.5" stroke="currentColor"/>
                <circle cx="10" cy="12" r="6" stroke="currentColor"/>
                <circle cx="28" cy="12" r="6" stroke="currentColor" strokeOpacity={0.5}/>
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
                    <Card key={card.id} className="flex flex-col justify-between overflow-hidden">
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
