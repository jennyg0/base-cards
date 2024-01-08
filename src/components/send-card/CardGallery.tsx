import { useState } from 'react';

const cards = [
  {
    id: 1,
    title: 'Card 1',
    image:
      'https://crimson-xeric-thrush-851.mypinata.cloud/ipfs/QmWJt9hgWXQiukVpwXKhken4YnP5pmJHpeJWDGhm5V2MDb',
  },
  {
    id: 2,
    title: 'Card 2',
    image:
      'https://crimson-xeric-thrush-851.mypinata.cloud/ipfs/QmaQb8rkCXZHwcYf3sCpS3T27cT9eE7DG1E8Noxc6owZ8Z',
  },
  {
    id: 3,
    title: 'Card 3',
    image:
      'https://crimson-xeric-thrush-851.mypinata.cloud/ipfs/QmUGSF6Dkc5yhzpVu48G7F6VzHjnajd5hZzXmh4DgPyYtM',
  },
  {
    id: 4,
    title: 'Card 4',
    image:
      'https://crimson-xeric-thrush-851.mypinata.cloud/ipfs/QmRMKbChPwFxfETVdsWT1CnYmWJrcAKKMJiAiooa1MvpJX',
  },
];

type CardType = {
  id: number;
  title: string;
  image: string;
};

type CardGalleryProps = {
  onSelect: (card: CardType) => void;
};

const CardGallery: React.FC<CardGalleryProps> = ({ onSelect }) => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const handleSelectCard = (card: CardType) => {
    setSelectedCard(card);
    onSelect(card);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`${
            selectedCard?.id === card.id ? 'ring-4 ring-white ring-opacity-80' : ''
          } cursor-pointer overflow-hidden rounded-[50px]`}
          onClick={() => handleSelectCard(card)}
        >
          <figure>
            <img src={card.image} alt={card.title} className="w-full" />
          </figure>
        </div>
      ))}
    </div>
  );
};

export default CardGallery;
