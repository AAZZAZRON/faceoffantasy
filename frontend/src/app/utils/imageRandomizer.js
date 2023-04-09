import pic1 from '../../images/randomize/avs-preds.jpg';
import pic2 from '../../images/randomize/avs-sharks.jpeg'; // mid
import pic3 from '../../images/randomize/avs-vgk.jpeg'; // mid
import pic4 from '../../images/randomize/bergeron.png'; // mid
import pic5 from '../../images/randomize/crosby.jpg';
import pic6 from '../../images/randomize/ducks.jpeg'; // mid
import pic7 from '../../images/randomize/malkin.jpeg';
import pic8 from '../../images/randomize/mcdavid-crosby.jpeg';
import pic9 from '../../images/randomize/mcdavid-matthews.jpeg';
import pic10 from '../../images/randomize/mcdavid.jpeg'; // kinda mid
import pic11 from '../../images/randomize/rangers.webp';
import pic12 from '../../images/randomize/sabres-kraken.webp'; // mid
import pic13 from '../../images/randomize/stamkos.webp'; // not terrible

export const getRandomImage = () => {
    const images = [
        pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13
    ]

    const ind = Math.floor(Math.random() * images.length);

    return images[ind];
}