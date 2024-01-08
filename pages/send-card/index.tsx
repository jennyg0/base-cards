import { useState } from 'react';
import Header from '../../src/components/header/Header';
import { TitleAndMetaTags } from '../../src/components/TitleAndMetaTags';
import CardGallery from '../../src/components/send-card/CardGallery';
import styles from './SendCard.module.css';
import SendCardForm from '../../src/components/send-card/SendCardForm';

type CardType = {
  id: number;
  title: string;
  image: string;
};

export default function SendCardPage() {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
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
          <div className="container mx-auto flex flex-row">
            <div className="flex-1">
              <CardGallery onSelect={setSelectedCard} />
            </div>
            <div className="flex-1">
              <SendCardForm selectedCard={selectedCard} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
