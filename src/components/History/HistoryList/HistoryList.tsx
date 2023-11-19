import {Text, FlatList} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import styles from './HistoryList.styles';
import {
  ChipTypes,
  ChipsHistoryDelegate,
  GWHistoryDelegate,
} from 'src/types/api';
import {formatPrice} from '@utils/formatPrice';
import Collapsible from 'react-native-collapsible';
import Touchable from '@components/common/Touchable';
import ChevronIcon from '@assets/svgs/ChevronIcon';
import {colors} from '@constants/colors';

type Props = {
  data: GWHistoryDelegate[];
  chips: ChipsHistoryDelegate;
};

const HistoryList = ({data, chips}: Props) => {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const expandItemHandler = (index: number) =>
    setExpandedIndex(prevState => (prevState === index ? -1 : index));

  const _renderItem = ({
    item,
    index,
  }: {
    item: (typeof sortedData)[0];
    index: number;
  }) => (
    <>
      <Touchable
        style={styles.itemHeaderContainer}
        onPress={() => expandItemHandler(index)}>
        <Text style={styles.headerText}>{`Gameweek ${item.event}`}</Text>
        {item?.chip && (
          <Text style={styles.textChip}>{ChipTypes?.[item.chip] || ''}</Text>
        )}
        <ChevronIcon
          rotation={index === expandedIndex ? 'up' : 'down'}
          width={24}
          height={24}
          color={colors.accentDark}
        />
      </Touchable>
      <Collapsible
        style={styles.itemCollapsibleContainer}
        collapsed={index !== expandedIndex}>
        <Text style={styles.text}>
          Points: <Text style={styles.textBold}>{item.points}</Text>
        </Text>
        <Text style={styles.text}>
          Total points: <Text style={styles.textBold}>{item.total_points}</Text>
        </Text>
        <Text style={styles.text}>
          Rank: <Text style={styles.textBold}>{item.rank}</Text>
        </Text>
        <Text style={styles.text}>
          Rank sort: <Text style={styles.textBold}>{item.rank_sort}</Text>
        </Text>
        <Text style={styles.text}>
          Overall rank: <Text style={styles.textBold}>{item.overall_rank}</Text>
        </Text>
        <Text style={styles.text}>
          Bank: <Text style={styles.textBold}>{formatPrice(item.bank)}</Text>
        </Text>
        <Text style={styles.text}>
          Team value: <Text style={styles.textBold}>{item.value}</Text>
        </Text>
        <Text style={styles.text}>
          Transfers: <Text style={styles.textBold}>{item.event_transfers}</Text>
        </Text>
        <Text style={styles.text}>
          Transfers cost:{' '}
          <Text style={styles.textBold}>
            {item.event_transfers_cost ? `-${item.event_transfers_cost}` : ''}
          </Text>
        </Text>
        <Text style={styles.text}>
          Bench points:{' '}
          <Text style={styles.textBold}>{item.points_on_bench}</Text>
        </Text>
      </Collapsible>
    </>
  );

  const sortedData = useMemo(
    () =>
      data
        .map(el => ({
          ...el,
          chip: chips.find(c => c.event === el.event)?.name || null,
        }))
        .sort((a, b) => b.event - a.event),
    [data, chips],
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ref={flatListRef}
      data={sortedData}
      keyExtractor={item => item.event.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={_renderItem}
    />
  );
};

export default HistoryList;
