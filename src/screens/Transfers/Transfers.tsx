import {View, Text, FlatList, RefreshControl} from 'react-native';
import React, {useLayoutEffect, useMemo} from 'react';
import styles from './Transfers.styles';
import {StackScreenProps} from '@react-navigation/stack';
import {LeaguesStackProps, TeamStackProps} from 'src/types/navigation';
import {useQuery} from '@tanstack/react-query';
import {fetchBootstrapStatic, fetchManagerTransfers} from '@services/api';
import LoadingView from '@components/common/LoadingView';
import {filterManagerTransfers} from '@utils/filterManagerTransfers';
import {CustomTransferDelegate} from 'src/types/api';
import Touchable from '@components/common/Touchable';
import dayjs from 'dayjs';
import {formatPrice} from '@utils/formatPrice';
import {colors} from '@constants/colors';

type Props = StackScreenProps<TeamStackProps | LeaguesStackProps, 'Transfers'>;

const Transfers = ({navigation, route}: Props) => {
  const {teamId, teamName} = route.params;

  const {data: bData} = useQuery(['bootstrapStatic'], fetchBootstrapStatic, {
    cacheTime: Infinity,
  });

  const {
    data: transfers,
    isFetching: transfersFetching,
    isRefetching: transfersRefetching,
    refetch: transfersRefetch,
  } = useQuery(
    ['managerTransfers', teamId],
    () => fetchManagerTransfers(teamId),
    {
      staleTime: 20000,
    },
  );

  useLayoutEffect(() =>
    navigation.setOptions({
      headerTitle: `Transfers${teamName ? ` (${teamName})` : ''}`,
    }),
  );

  const filteredTransfers = useMemo(
    () => filterManagerTransfers(bData?.elements, transfers),
    [bData?.elements, transfers],
  );

  const isNotLast = (index: number) =>
    !(filteredTransfers.length - 1 === index);

  if (transfersFetching && !transfersRefetching) {
    return <LoadingView />;
  }

  const _renderHeader = () => (
    <View style={[styles.itemContainer, styles.headerContainer]}>
      <View style={styles.column1Container}>
        <Text style={[styles.text, styles.textBold]}>Time</Text>
      </View>
      <View style={styles.column2Container}>
        <Text style={[styles.text, styles.textBold]}>Player In</Text>
      </View>
      <View style={styles.column3Container}>
        <Text style={[styles.text, styles.textBold]}>Player Out</Text>
      </View>
      <View style={styles.column4Container}>
        <Text style={[styles.text, styles.textBold]}>GW</Text>
      </View>
    </View>
  );

  const _renderItem = ({
    item,
    index,
  }: {
    item: CustomTransferDelegate;
    index: number;
  }) => (
    <View
      key={`${item.element_in}-${item.element_out}-${item.time}`}
      style={[
        styles.itemContainer,
        isNotLast(index) && styles.itemContainerSeparator,
      ]}>
      <View style={styles.column1Container}>
        <Text style={styles.text}>
          {dayjs(item.time).format('D MMM\nHH:mm')}
        </Text>
      </View>
      <Touchable style={styles.column2Container} onPress={() => {}}>
        <Text
          style={[styles.text, styles.textBold]}
          numberOfLines={1}
          adjustsFontSizeToFit>{`${item.element_in_web_name} (${formatPrice(
          item.element_in_cost,
        )})`}</Text>
      </Touchable>
      <Touchable style={styles.column3Container} onPress={() => {}}>
        <Text
          style={[styles.text, styles.textBold]}
          numberOfLines={1}
          adjustsFontSizeToFit>{`${item.element_out_web_name} (${formatPrice(
          item.element_out_cost,
        )})`}</Text>
      </Touchable>
      <View style={styles.column4Container}>
        <Text style={styles.text}>{item.event}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={filteredTransfers}
      keyExtractor={(_, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      renderItem={_renderItem}
      ListHeaderComponent={_renderHeader}
      stickyHeaderIndices={[0]}
      refreshControl={
        <RefreshControl
          refreshing={transfersRefetching}
          onRefresh={transfersRefetch}
          title="Pull to refresh"
          titleColor={colors.accentDark}
          colors={[colors.accentDark]}
          tintColor={colors.accentDark}
        />
      }
    />
  );
};

export default Transfers;
