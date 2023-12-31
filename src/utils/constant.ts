import { CreateRoomFormType } from '@/types/roomsTypes';

export const userProfileImg =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

export const optionsFriendFilter = [
  { name: 'Active', value: 'active' },
  { name: 'Inactive', value: 'inactive' },
  { name: 'A to Z', value: 'atoz' },
  { name: 'Z to A', value: 'ztoa' },
];

export const initialValueCreateRoom: CreateRoomFormType = {
  roomId: '',
  gameName: '',
  gameType: '',
  mapType: '',
  password: '',
  version: '',
  date: '',
  time: '',
  lastSurvival: '',
  thirdWin: '',
  highestKill: '',
  secondWin: '',
  mapImg: '',
  entryFee: '',
};

export const specRoomColumns: string[] = [
  'Room Id',
  'Game Name',
  'Game Type',
  'Map Type',
  'Version',
  'Winner',
  'Time/Date',
  'Entry Fee',
  'Add Winner',
  'View Winner',
  'Video',
  'Action',
];

export const policyArr = [
  `The Website Owner, including subsidiaries and affiliates (“Website” or “Website Owner” or
  “we” or “us” or “our”) provides the information contained on the website or any of the
  pages comprising the website (“website”) to visitors (“visitors”) (cumulatively referred
  to as “you” or “your” hereinafter) subject to the terms and conditions set out in these
  website terms and conditions, the privacy policy and any other relevant terms and
  conditions, policies and notices which may be applicable to a specific section or module
  of the website.`,
  `Welcome to our website. If you continue to browse and use this website you are agreeing to
  comply with and be bound by the following terms and conditions of use, which together with
  our privacy policy govern TECHNOGETIC PVT LTD''s relationship with you in relation to this
  website. The term 'TECHNOGETIC PVT LTD' or 'us' or 'we' refers to the owner of the website
  whose registered/operational office is 3rd Floor, Plot No. E-299, Corporate Greens, Phase
  8A, Industrial Area, Sector 75, Vista Infotech, Mohali SAS Nagar PUNJAB 160055. The term
  'you' refers to the user or viewer of our website.`,
];

export const termsArr = [
  `The content of the pages of this website is for your general information and use only.
It is subject to change without notice.`,
  `Neither we nor any third parties provide any warranty or guarantee as to the accuracy,
timeliness, performance, completeness or suitability of the information and materials
found or offered on this website for any particular purpose. You acknowledge that such
information and materials may contain inaccuracies or errors and we expressly exclude
liability for any such inaccuracies or errors to the fullest extent permitted by law.`,
  `Your use of any information or materials on this website is entirely at your own risk,
for which we shall not be liable. It shall be your own responsibility to ensure that any
products, services or information available through this website meet your specific
requirements.`,
  `This website contains material which is owned by or licensed to us. This material
includes, but is not limited to, the design, layout, look, appearance and graphics.
Reproduction is prohibited other than in accordance with the copyright notice, which
forms part of these terms and conditions.`,
  `All trademarks reproduced in this website which are not the property of, or licensed to,
the operator are acknowledged on the website.`,
  `Unauthorized use of this website may give rise to a claim for damages and/or be a
criminal offense.`,
  `From time to time this website may also include links to other websites. These links are
provided for your convenience to provide further information.`,
  `You may not create a link to this website from another website or document without
TECHNOGETIC PVT LTD’s prior written consent.`,
  `Your use of this website and any dispute arising out of such use of the website is
subject to the laws of India or other regulatory authority.`,
  `We as a merchant shall be under no liability whatsoever in respect of any loss or damage
arising directly or indirectly out of the decline of authorization for any Transaction,
on Account of the Cardholder having exceeded the preset limit mutually agreed by us with
our acquiring bank from time to time`,
];

export const adminSpecColumns: string[] = ['Full Name', 'User Name', 'Email', 'Permission'];

export const adminRoomColumns: string[] = [
  'Created By',
  'Assigned To',
  'Room Id',
  'Password',
  'Game Name',
  'Game Type',
  'Map Type',
  'Version',
  'Assign',
  'Time',
  'Date',
  'Permission',
];

export const adminVidoColumns: string[] = [
  'Created by',
  'Video',
  'Title',
  'Match Type',
  'Date',
  'Time',
];
export const VidoColumns: string[] = ['Video', 'Title', 'Match Type', 'Date', 'Time'];
export const adminUserColumns: string[] = [
  'Full Name',
  'Player ID',
  'Email',
  'Phone Number',
  'UPI ID',
  'Permission',
];

export const LeaderBoardColumns: string[] = ['Team Name', 'Points', 'Match Type', 'Win', 'Lose'];
