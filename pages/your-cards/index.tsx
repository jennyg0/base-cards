import { useState } from 'react';
import Header from '../../src/components/header/Header';
import { TitleAndMetaTags } from '../../src/components/TitleAndMetaTags';
import StarryBackground from '../../src/components/send-card/StarryBackground';
import CardGallery from '../../src/components/send-card/CardGallery';
import styles from './SendCard.module.css';
import SendCardForm from '../../src/components/send-card/SendCardForm';

type CardType = {
  id: number;
  title: string;
  image: string;
};

export default function SendCardPage() {
  return (
    <>
      <TitleAndMetaTags
        title="Nfty Cards"
        description="Send fun greeting cards to all of your frens."
        image="themes.png"
      />

      <main className="container mx-auto flex flex-col">
        <Header />
      </main>
    </>
  );
}
