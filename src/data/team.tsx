import t1 from '@/assets/images/team/FabrizioGenovese.webp'
import t2 from '@/assets/images/team/AndreaVillager.webp'
import t3 from '@/assets/images/team/RaffaeleOrefice.webp'
import t4 from '@/assets/images/team/IonutGaucan.webp'
import t5 from '@/assets/images/team/gianluca.webp'
import t6 from '@/assets/images/team/lore.webp'
import t8 from '@/assets/images/team/PaolaCiaramella.webp'
import t9 from '@/assets/images/team/Maria Maddalena.webp'
import t10 from '@/assets/images/team/med.webp'

export interface TeamMember {
    name: string;
    image: string;
    position: string;
}

export const TeamMembersList: TeamMember[] = [
    {
        name: 'Fabrizio R. Genovese',
        image: t1.src,
        position: 'Strategy Lead'
    },
    {
        name: 'Andrea Paesano',
        image: t2.src,
        position: 'Event Lead'
    },
    {
        name: 'Gianluca Di Bella',
        image: t5.src,
        position: 'Strategic Partner'
    },
    {
        name: 'Lorenzo Ceppaluni',
        image: t6.src,
        position: 'Strategic Partner'
    },
    {
        name: 'Paola Ciaramella',
        image: t8.src,
        position: 'Business Dev.'
    },
    {
        name: 'Ionut Gaucan',
        image: t4.src,
        position: 'Business Dev.'
    },
    {
        name: 'Raffaele Orefice',
        image: t3.src,
        position: 'Community Lead'
    },
    {
        name: 'Maria .M Ascione',
        image: t9.src,
        position: 'Business Dev.'
    },
    {
        name: 'Med Ben moussa',
        image: t10.src,
        position: 'Web Developer'
    },
]
