import { useState } from 'react';
import Header from '../../src/components/header/Header';
import { TitleAndMetaTags } from '../../src/components/TitleAndMetaTags';
import NFTGallery from '../../src/components/send-card/NFTGallery';
import styles from '../send-card/SendCard.module.css';

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
        <div className={styles.BackgroundGradient}>
          <Header />
          <NFTGallery />
        </div>
      </main>
    </>
  );
}
