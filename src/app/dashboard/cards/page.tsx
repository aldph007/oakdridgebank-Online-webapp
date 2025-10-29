'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DollarSign, Trash2, PlusCircle, MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const cards = [
    {
        id: 'card-1',
        bankName: 'OAKridgebank',
        cardNumber: '4085 **** **** 6829',
        cardHolder: 'Joseph H. Phillips',
        expires: '12/26',
        balance: '256,907.35',
        bgColor: 'bg-gradient-to-br from-teal-700 to-emerald-900',
        textColor: 'text-white',
        logo: (
            <div className="flex items-center gap-1 text-white font-bold text-xl">
                <span>M</span>
                <span className="h-4 w-px bg-white"></span>
                <span>O</span>
            </div>
        )
    },
    {
        id: 'card-2',
        bankName: 'OAKridgebank',
        cardNumber: '5594 **** **** 6829',
        cardHolder: 'Joseph H. Phillips',
        expires: '08/25',
        balance: '95,701.17',
        bgColor: 'bg-gradient-to-br from-gray-800 to-gray-900',
        textColor: 'text-white',
        logo: (
            <div className="flex">
                <div className="h-6 w-6 rounded-full bg-red-600"></div>
                <div className="h-6 w-6 rounded-full bg-yellow-500 -ml-3"></div>
            </div>
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
                    <Card key={card.id} className="flex flex-col justify-between">
                        <CardHeader className={`relative rounded-t-lg ${card.bgColor} ${card.textColor} p-6`}>
                            <div className="flex justify-between items-start">
                                <span className="font-semibold">{card.bankName}</span>
                                {card.logo}
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
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
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
