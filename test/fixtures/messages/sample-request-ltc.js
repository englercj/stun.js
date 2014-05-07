/**
 * This is a test message from RFC5769 - Test Vectors for Session Traversal Utilities for NAT (STUN)
 * https://tools.ietf.org/html/rfc5769
 *
 *
 *
 * 2.4.  Sample Request with Long-Term Authentication
 *
 * This request uses the following parameters:
 *
 * Username:  "<U+30DE><U+30C8><U+30EA><U+30C3><U+30AF><U+30B9>"
 *    (without quotes) unaffected by SASLprep [RFC4013] processing
 *
 * Password:  "The<U+00AD>M<U+00AA>tr<U+2168>" and "TheMatrIX" (without
 *    quotes) respectively before and after SASLprep processing
 *
 * Nonce:  "f//499k954d6OL34oL9FSTvy64sA" (without quotes)
 *
 * Realm:  "example.org" (without quotes)
 *
 *    00 01 00 60     Request type and message length
 *    21 12 a4 42     Magic cookie
 *    78 ad 34 33  }
 *    c6 ad 72 c0  }  Transaction ID
 *    29 da 41 2e  }
 *    00 06 00 12     USERNAME attribute header
 *    e3 83 9e e3  }
 *    83 88 e3 83  }
 *    aa e3 83 83  }  Username value (18 bytes) and padding (2 bytes)
 *    e3 82 af e3  }
 *    82 b9 00 00  }
 *    00 15 00 1c     NONCE attribute header
 *    66 2f 2f 34  }
 *    39 39 6b 39  }
 *    35 34 64 36  }
 *    4f 4c 33 34  }  Nonce value
 *    6f 4c 39 46  }
 *    53 54 76 79  }
 *    36 34 73 41  }
 *    00 14 00 0b     REALM attribute header
 *    65 78 61 6d  }
 *    70 6c 65 2e  }  Realm value (11 bytes) and padding (1 byte)
 *    6f 72 67 00  }
 *    00 08 00 14     MESSAGE-INTEGRITY attribute header
 *    f6 70 24 65  }
 *    6d d6 4a 3e  }
 *    02 b8 e0 71  }  HMAC-SHA1 fingerprint
 *    2e 85 c9 a2  }
 *    8c a8 96 66  }
 *
 */

var Buffer = require('buffer').Buffer;
module.exports = new Buffer([
    0x00, 0x01, 0x00, 0x60, //    Request type and message length
    0x21, 0x12, 0xa4, 0x42, //    Magic cookie
    0x78, 0xad, 0x34, 0x33, // }
    0xc6, 0xad, 0x72, 0xc0, // }  Transaction ID
    0x29, 0xda, 0x41, 0x2e, // }
    0x00, 0x06, 0x00, 0x12, //    USERNAME attribute header
    0xe3, 0x83, 0x9e, 0xe3, // }
    0x83, 0x88, 0xe3, 0x83, // }
    0xaa, 0xe3, 0x83, 0x83, // }  Username value (18 bytes) and padding (2 bytes)
    0xe3, 0x82, 0xaf, 0xe3, // }
    0x82, 0xb9, 0x00, 0x00, // }
    0x00, 0x15, 0x00, 0x1c, //    NONCE attribute header
    0x66, 0x2f, 0x2f, 0x34, // }
    0x39, 0x39, 0x6b, 0x39, // }
    0x35, 0x34, 0x64, 0x36, // }
    0x4f, 0x4c, 0x33, 0x34, // }  Nonce value
    0x6f, 0x4c, 0x39, 0x46, // }
    0x53, 0x54, 0x76, 0x79, // }
    0x36, 0x34, 0x73, 0x41, // }
    0x00, 0x14, 0x00, 0x0b, //    REALM attribute header
    0x65, 0x78, 0x61, 0x6d, // }
    0x70, 0x6c, 0x65, 0x2e, // }  Realm value (11 bytes) and padding (1 byte)
    0x6f, 0x72, 0x67, 0x00, // }
    0x00, 0x08, 0x00, 0x14, //    MESSAGE-INTEGRITY attribute header
    0xf6, 0x70, 0x24, 0x65, // }
    0x6d, 0xd6, 0x4a, 0x3e, // }
    0x02, 0xb8, 0xe0, 0x71, // }  HMAC-SHA1 fingerprint
    0x2e, 0x85, 0xc9, 0xa2, // }
    0x8c, 0xa8, 0x96, 0x66  // }
]);
